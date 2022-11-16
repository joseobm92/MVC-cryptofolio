const router = require('express').Router();
const { User, Cryptocurrency, Cryptolist } = require('../models');
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

// get 1 cryptocurrency using ID
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

// get 1 cryptocurrency using name from using coincecko api
async function getCoinGecko (name)  {
  try {
    response = await axios.get(`https://api.coingecko.com/api/v3/coins/${name}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`);
  } catch(err) {
    response = null;
    // error
    console.log(err);
  }
  if (response) {
    // success
   
    console.log("COINGECKO RESPONSE")
    console.log(response.data.name);
    console.log(response.data.symbol);
    console.log(response.data.market_data.current_price.usd);
    console.log(response.data.market_data.market_cap.usd);
    console.log(response.data.market_data.market_cap_rank);
    console.log(response.data.market_data.total_supply);
    console.log(response.data.market_data.max_supply);
    console.log(response.data.market_data.circulating_supply);
    
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

// get single crypto
router.get('/coin/:id', withAuth, async (req, res) => {

  try {
    console.log(req.params.id);
    let result = await getOneCryptocurrency(req.params.id)
    console.log(result.data[0]);
    res.render('single-coin', { data: result.data[0],
      logged_in: req.session.logged_in })
  } catch (err) {
    res.status(500).json(err);
  }

})

// get single crypto using search bar
router.get('/search/:name', async (req, res) => {

  try {
    console.log(req.params.name);
    const data = await Cryptolist.findOne({
      where: {
        name: req.params.name,
      },
      raw: true,
    });

    //const data = id.toJSON();
    //const data = id.get({ plain: true });
    console.log("THIS IS THE NAME/ID");
    console.log(data);

    const name = data.slug;
    console.log(name);
    
  
    let result = await getCoinGecko(name)
    console.log('THIS IS ROUTER.GET')
    console.log(result.name);
    console.log(result.symbol);
    console.log(result.market_data.current_price.usd);
    console.log(result.market_data.market_cap.usd);
    console.log(result.market_data.market_cap_rank);
    console.log(result.market_data.total_supply);
    console.log(result.market_data.max_supply);
    console.log(result.market_data.circulating_supply);
    
    res.render('search-single-coin', { 
    name: result.name,
    symbol: result.symbol,
    current_price: result.market_data.current_price.usd,
    market_cap: result.market_data.market_cap.usd,
    rank: result.market_data.market_cap_rank,
    total_supply: result.market_data.total_supply,
    max_supply: result.market_data.max_supply,
    current_supply: result.market_data.circulating_supply,
    logged_in: req.session.logged_in });
  } catch (err) {
    console.log(err);
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
