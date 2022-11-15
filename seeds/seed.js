const sequelize = require('../config/connection');
const { Cryptocurrency, Stat, User, Watchlist } = require('../models');


const cryptocurrencyData = require('./cryptocurrencyData.json');
const statData = require('./statData.json');
const userData = require('./userData.json');
const watchlistData = require('./watchlistData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });


//create seeds for user table from userData.json
const user = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });


//gets seeds for cryptocurrency table from cryptocurrencyData.json
// TODO : for the cryptocurrency table, add a user_id row 
const cryptocurrency= await Cryptocurrency.bulkCreate(cryptocurrencyData, {
  });

// gets seeds for stat table from statData.json
//for the stat table, add a cryptocurrceny_id row
  for (const stat of statData) {
    await Stat.create({
      ...stat,
      cryptocurrency_id: cryptocurrency[Math.floor(Math.random() * cryptocurrency.length)].id,
    });
  }

//gets seeds for watchlist table from watchlistData.json
//for the watchlist table, add a cryptocurrency_id row and a user_id row

for (const watchlist of watchlistData) {
    await Watchlist.create({
      ...watchlist,
      cryptocurrency_id: cryptocurrency[Math.floor(Math.random() * cryptocurrency.length)].id,
      user_id: user[Math.floor(Math.random() * user.length)].id,
    });
  }


  process.exit(0);
};

seedDatabase();
