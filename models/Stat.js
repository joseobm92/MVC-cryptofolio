const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Stat extends Model {}

Stat.init(
  {
   
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    market_cap: {
        type:DataTypes.INTEGER,
        allowNull: false
    },
    circulating_supply: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    max_supply: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'stat',
  }
);

module.exports = Stat;
