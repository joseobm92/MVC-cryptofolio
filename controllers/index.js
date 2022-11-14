const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const watchlistRoutes = require('./watchlistRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/watchlist', watchlistRoutes);

module.exports = router;
