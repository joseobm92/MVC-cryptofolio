const User = require('./User');
const Cryptocurrency = require('./Cryptocurrency');

User.hasMany(Cryptocurrency, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Cryptocurrency.hasMany(User, {
//   foreignKey: 'cryptocurrency_id',
//   onDelete: 'CASCADE'
// });

// Cryptocurrency.belongsToMany(User, { 
//   foreignKey: 'cryptocurrency_id',
// });


// User.belongsToMany(Cryptocurrency, { 
//   foreignKey: 'user_id',
// });


module.exports = { User, Cryptocurrency };
