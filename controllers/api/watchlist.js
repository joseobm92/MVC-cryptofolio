const router = require('express').Router();
const { Cryptocurrency } = require('../../models');
const withAuth = require('../../utils/auth');

// add crypto to user watchlist
router.post('/', async (req, res) => {

    try {
        console.log(req.body)

        const cryptoData = await Cryptocurrency.create({ 
        rank: req.body.cryptoRank, 
        name: req.body.cryptoName,
        symbol: req.body.cryptoSymbol,
        price: req.body.cryptoPrice, 
        market_cap: req.body.cryptoMc,
        circulating_supply: req.body.cryptoCircSupply, 
        max_supply: req.body.cryptoTotalSupply,
        user_id: req.session.user_id
    });
        
        res.status(200).json({message: "good!"})
    } catch (err) {
        console.log(err)
    }
});

// delete crypto from user watchlist
router.delete('/:id', async (req, res) => {
    try {
      const cryptoData = await Cryptocurrency.destroy({
        where: {
          id: req.params.id,
          //user_id: req.session.user_id,
        },
      });
      if (!cryptoData) {
        res.status(404).json({ message: 'No coin found with this id!' });
        return;
      }
      res.status(200).json({message: 'Removed!'});
    } catch (err) {
      res.status(500).json(err);
    }
});



module.exports = router;