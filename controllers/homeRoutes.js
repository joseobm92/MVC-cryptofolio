const router = require('express').Router();
const { User, Cryptocurrency, Watchlist } = require('../models');
const withAuth = require('../utils/auth');
const axios = require('axios');

let response = null;

// top 10 crypto name symbol price & MC
async function getCryptocurrency (resolve, reject)  {
  try {
    response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=10&sort_dir=desc', {
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
    
    // model bulk create & pass data to it
    return data
  }
};

// get 1 cryptocurrency
async function getOneCryptocurrency (id)  {
  try {
    response = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=${id}&limit=1&sort_dir=desc`, {
      headers: {
        'X-CMC_PRO_API_KEY': 'd0fafe5d-679a-4901-bebf-c7dcea6c596a',
      },
    });
  } catch(err) {
    response = null;
    // error
    console.log(err);
  }
  if (response) {
    // success
   
    const data = response.data;
    
    // model bulk create & pass data to it
    return data
  }
};




router.get('/', async (req, res) => {
  try { 
    let result = await getCryptocurrency()
    console.log('test')
    
    res.render('homepage', { data: result.data,
    logged_in: req.session.logged_in })
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/coin/:id', withAuth, async (req, res) => {

  try {
    console.log(req.params.id);
    let result = await getOneCryptocurrency(req.params.id)
    console.log('test 1 crypto')
    console.log(result.data[0]);
    res.render('single-coin', { data: result.data[0],
      logged_in: req.session.logged_in })
  } catch (err) {
    res.status(500).json(err);
  }


})

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
