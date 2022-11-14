const sequelize = require('../config/connection');
const { User, Cryptocurrency, Stat, Watchlist } = require('../models');

const userData = require('./userData.json');
const cryptocurrencyData = require('./cryptocurrencyData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const cryptocurrency of cryptocurrencyData) {
    await Cryptocurrency.create({
      ...cryptocurrency,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
