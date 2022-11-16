const User = require('./User');
const Cryptocurrency = require('./Cryptocurrency');
const Cryptolist = require('./Cryptolist')

User.hasMany(Cryptocurrency, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});


module.exports = { User, Cryptocurrency, Cryptolist };
