const router = require('express').Router();
const Cryptocurrency = require('../models/Cryptocurrency');
const withAuth = require('../utils/auth')
const User = require('../models/User');

// route to get all post and render thru all-post-admin handlebar
// Use withAuth middleware to prevent access to route
router.get('/', withAuth, async (req, res) => {
  try {
    // Get all POST and JOIN with user data
    console.log("TESTING HERE!!!")
    console.log(req.session.user_id);
    const cryptocurrencyData = await Cryptocurrency.findAll({
        where: {
            user_id: req.session.user_id 
        }
    });

    console.log(cryptocurrencyData);

    // Serialize data so the template can read it
    const cryptocurrencies = cryptocurrencyData.map((cryptocurrency) => cryptocurrency.get({ plain: true }));

    // Pass serialized data and session flag into template
    
    res.render('watchlist', {
      cryptocurrencies,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
