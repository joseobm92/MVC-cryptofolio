const sequelize = require('../config/connection');
const { Cryptocurrency, Stat, User, Watchlist } = require('../models');


const cryptocurrencyData = require('./cryptocurrencyData.json');
const statData = require('./statData.json');
const userData = require('./userData.json');
const watchlistData = require('./watchlistData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const stats = await Stat.bulkCreate(statData, {
    individualHooks: true,
    returning: true,
  });

  const cryptocurrencies = await Cryptocurrency.bulkCreate(cryptocurrencyData, {
    individualHooks: true,
    returning: true,
  });

  const watchlists = await Watchlist.bulkCreate(watchlistData, {
    individualHooks: true,
    returning: true,
  });


  // for (const project of projectData) {
  //   await Project.create({
  //     ...project,
  //     user_id: users[Math.floor(Math.random() * users.length)].id,
  //   });
  // }

  process.exit(0);
};

seedDatabase();
