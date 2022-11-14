const { Watchlist } = require('../models');

const watchlistData = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
];

const seedWatchlist = () => Watchlist.bulkCreate(watchlistData);