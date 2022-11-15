const router = require('express').Router();
const { Cryptocurrency } = require('../../models');


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
})


module.exports = router;