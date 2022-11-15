const User = require('./User');
const Cryptocurrency = require('./Cryptocurrency');
const Watchlist = require('./Watchlist');

User.hasMany(Cryptocurrency, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});


Cryptocurrency.belongsToMany(User, { 
  through: Watchlist,
  foreignKey: 'cryptocurrency_id',
});


User.belongsToMany(Cryptocurrency, { 
  through: Watchlist,
  foreignKey: 'user_id',
});


module.exports = { User, Cryptocurrency, Watchlist };
