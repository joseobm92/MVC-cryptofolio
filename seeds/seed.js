const sequelize = require('../config/connection');
const { Cryptolist } = require('../models');

const cryptocurrencyData = require('./cryptocurrencyData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const crypto = await Cryptolist.bulkCreate(cryptocurrencyData);

  process.exit(0);
};

seedDatabase();
