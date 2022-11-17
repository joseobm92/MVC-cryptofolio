const router = require('express').Router();
const {
  Cryptolist
} = require('../models');
const withAuth = require('../utils/auth');
const {
  getCryptocurrency,
  getCoinGecko,
  getByMarketCap,
  getByVolume,
  getExchanges
} = require('../utils/axios-fetch');
const dotenv = require('dotenv').config();


// home route
router.get('/', async (req, res) => {
  try {
    let result = await getCryptocurrency()
    console.log('test')
    console.log(result);

    res.render('homepage', {
      data: result,
      logged_in: req.session.logged_in
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

// route to get & render marketcap sorted data
router.get('/marketcap', withAuth, async (req, res) => {
  try {
    let result = await getByMarketCap();
    //console.log(result);

    res.render('market-cap', {
      data: result,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// route to get & render volume sorted data
router.get('/volume', withAuth, async (req, res) => {
  try {
    let result = await getByVolume();
    //console.log(result);

    res.render('volume', {
      data: result,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});


// route to get & render EXCHANGES 
router.get('/exchanges', withAuth, async (req, res) => {
  try {
    let result = await getExchanges();
    //console.log(result);

    res.render('exchanges', {
      data: result,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});


// get single crypto data
router.get('/search/:name', withAuth, async (req, res) => {

  try {
    console.log(req.params.name);
    const data = await Cryptolist.findOne({
      where: {
        slug: req.params.name,
      },
      raw: true,
    });

    console.log("THIS IS THE NAME/ID");
    console.log(data);

    const name = data.slug;
    console.log(name);


    let result = await getCoinGecko(name)
    // console.log('THIS IS ROUTER.GET')
    // console.log(result.links);
    // console.log(result.links.homepage[0]);
    // console.log(result.links.subreddit_url);
    // console.log(result.links.twitter_screen_name);
    // console.log(result.genesis_date);
    // console.log(result.market_data.ath_date.usd);
    // console.log(result.market_data.atl_date.usd);

    const athDate = result.market_data.ath_date.usd.slice(0, -14);
    const atlDate = result.market_data.atl_date.usd.slice(0, -14);

    res.render('search-single-coin', {
      slug: result.id,
      name: result.name,
      symbol: result.symbol,
      current_price: result.market_data.current_price.usd,
      market_cap: result.market_data.market_cap.usd,
      rank: result.market_data.market_cap_rank,
      total_supply: result.market_data.total_supply,
      max_supply: result.market_data.max_supply,
      current_supply: result.market_data.circulating_supply,
      description: result.description.en,
      ath_price: result.market_data.ath.usd,
      ath_date: athDate,
      atl_price: result.market_data.atl.usd,
      atl_date: atlDate,
      genesis_date: result.genesis_date,
      image: result.image.small,
      website: result.links.homepage[0],
      subreddit: result.links.subreddit_url,
      twitter: result.links.twitter_screen_name,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
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
    res.redirect('/watchlist');
    return;
  }

  res.render('login');
});

module.exports = router;