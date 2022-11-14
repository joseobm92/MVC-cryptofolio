const { Stat } = require('../models');

const statData = [
  {
    id: 1,
    price: 56.27,
    market_cap: 4026199201,
    circulating_supply: 71610743.73,
    max_supply: 84000000,
  },
  {
    id: 2,
    price: 12.96,
    market_cap: 3892986032,
    circulating_supply: 300299918.25,
    max_supply: 720000000,
  },
  {
    id: 3,
    price: 16451.32,
    market_cap: 315967167,
    circulating_supply: 238013.41 ,
    max_supply: '',
  },
  {
    id: 4,
    price: 3.74,
    market_cap: 3565092018,
    circulating_supply: 953954130.00,
    max_supply: '',
  },
  {
    id: 5,
    price: 6.16,
    market_cap: 953954130,
    circulating_supply: 491599970.45,
    max_supply: 1000000000,
  },
];

const seedStat = () => Stat.bulkCreate(statData);