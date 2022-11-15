const router = require('express').Router();
const { Stat, User, Cryptocurrency, Watchlist } = require('../models');
const withAuth = require('../utils/auth');
const axios = require('axios');

let response = null;

async function getCryptocurrency (resolve, reject)  {
  try {
    response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?sort=cmc_rank&limit=10', {
      headers: {
        'X-CMC_PRO_API_KEY': 'd0fafe5d-679a-4901-bebf-c7dcea6c596a',
      },
    });
  } catch(err) {
    response = null;
    // error
    console.log(err);
    reject(err);
  }
  if (response) {
    // success
    const data = response.data;
    return data
  }
};

router.get('/', async (req, res) => {
  try { 
    let result = await getCryptocurrency()
    console.log('test')
    console.log(result.data)
    
    // Get all cryptocurrency and JOIN with stats
    // const cryptocurrencyData = await Cryptocurrency.findAll({
    //   include: [
    //     {
    //       model: Stat,
    //       attributes: ['price', 'market_cap', 'circulating_suppy', 'max_supply' ],
    //     },
    //   ],
    // });

    // // Serialize cryptodata so the template can read it
    // const cryptocurrencies = cryptocurrencyData.map((cryptocurrency) => cryptocurrency.get({ plain: true }));

    // // Pass serialized data and session flag into template
    // res.render('homepage', { 
    //   cryptocurrencies, 
    //   logged_in: req.session.logged_in 
    // });
    res.render('homepage', { data: result.data })
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
        {
          model: User,
          attributes: [ 'username', 'id' ]
        }
      ],
    });

    const cryptocurrency = cryptocurrencyData.get({ plain: true });

    res.render('single-coin', { // maybe create a single-coin handlebar??? that will show alll stats ancc
      ...cryptocurrency,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// // Use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Project }],
//     });

//     const user = userData.get({ plain: true });

//     res.render('profile', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  
  res.render('signup');
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/watchlist');
    return;
  }

  res.render('login');
});

module.exports = router;
