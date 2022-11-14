const { Cryptocurrency } = require('../models');

const cryptocurrencyData = [
  {
    id: 1,
    rank: 17,
    name: 'Litecoin',
    symbol: 'LTC',
  },
  {
    id: 2,
    rank: 18,
    name: 'Avalanche',
    symbol: 'AVAX',
  },
  {
    id: 3,
    rank: 19,
    name: 'Wrapped Bitcoin',
    symbol: 'WBTC',
  },
  {
    id: 4,
    rank: 20,
    name: 'UNUS SED LEO',
    symbol: 'LEO',
  },
  {
    id: 5,
    rank: 21,
    name: 'Chainlink',
    symbol: 'chainlink',
  },

];

const seedCryptocurrency = () => Cryptocurrency.bulkCreate(cryptocurrencyData);