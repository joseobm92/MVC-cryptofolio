const router = require('express').Router();
const userRoutes = require('./userRoutes');
const watchlistRoutes = require('./watchlist')

router.use('/user', userRoutes);
router.use('/watchlist', watchlistRoutes);


module.exports = router;
