const sequelize = require('../config/connection');
const { Cryptocurrency, Stat, User, Watchlist } = require('../models');


const cryptocurrencyData = require('./cryptocurrencyData.json');
const statData = require('./statData.json');
const userData = require('./userData.json');
const watchlistData = require('./watchlistData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

//seeds for cryptocurrency table from cryptocurrencyData.json
const cryptocurrency = await Cryptocurrency.bulkCreate(cryptocurrencyData, {
   
  });

// create seeds for stat table from statData.json
const stat = await Stat.bulkCreate(statData, {
   
  });


//create seeds for user table from userData.json
//user had individual hooks

const user = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

//create seeds for watchlist table from watchlistData.json
const watchlist = await Watchlist.bulkCreate(watchlistData, {
   
});

//HOOKS

//for the cryptocurrency table, add a user_id row 
for (const cryptocurrency of cryptocurrencyData) {
    await Cryptocurrency.create({
      ...cryptocurrency,
      user_id: user[Math.floor(Math.random() * user.length)].id,
    });
  }

  //for the stat table, add a cryptocurrceny_id row
  for (const stat of statData) {
    await Stat.create({
      ...stat,
      cryptocurrency_id: cryptocurrency[Math.floor(Math.random() * cryptocurrency.length)].id,
    });
  }


//for the watchlist table, add a cryptocurrency_id row and a user_id row
for (const watchlist of watchlistData) {
    await Watchlist.create({
      ...watchlist,
      cryptocurrency_id: cryptocurrency[Math.floor(Math.random() * cryptocurrency.length)].id,
      user_id: user[Math.floor(Math.random() * user.length)].id,
    });
  }


  // for (const project of projectData) {
  //   await Project.create({
  //     ...project,
  //     user_id: users[Math.floor(Math.random() * users.length)].id,
  //   });
  // }

  process.exit(0);
};

seedDatabase();
