const router = require('express').Router();
const { Stat, User, Cryptocurrency, Watchlist } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all cryptocurrency and JOIN with stats
    const cryptocurrencyData = await Cryptocurrency.findAll({
      include: [
        {
          model: Stat,
          attributes: ['price', 'market_cap', 'circulating_suppy', 'max_supply' ],
        },
      ],
    });

    // Serialize data so the template can read it
    const cryptocurrencies = cryptocurrencyData.map((cryptocurrency) => cryptocurrency.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      cryptocurrencies, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/coin/:id', withAuth, async (req, res) => {
  try {
    const cryptocurrencyData = await Cryptocurrency.findByPk(req.params.id, {
      include: [
        {
          model: Stat,
          attributes: ['price', 'market_cap', 'circulating_suppy', 'max_supply' ],
        },
      ],
    });

    const cryptocurrency = cryptocurrencyData.get({ plain: true });

    res.render('project', { // maybe create a single-coin handlebar??? that will show alll stats ancc
      ...cryptocurrency,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  
  res.render('signup');
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
