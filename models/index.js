const User = require('./User');
const Cryptocurrency = require('./Cryptocurrency');
const Stat = require('./Stat');

User.hasMany(Cryptocurrency, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Stat.belongsTo(Cryptocurrency, {
  foreignKey: 'cryptocurrency_id',
  onDelete: 'CASCADE',
})


module.exports = { User, Stat, Cryptocurrency };
