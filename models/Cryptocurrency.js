const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Cryptocurrency extends Model {}

Cryptocurrency.init(
  {
    rank: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    symbol: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'cryptocurrency',
  }
);

module.exports = Cryptocurrency;
