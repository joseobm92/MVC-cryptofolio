const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Stat extends Model {}

Stat.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    market_cap: {
        type:DataTypes.DECIMAL,
        allowNull: false
    },
    circulating_supply: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    max_supply: {
        type: DataTypes.DECIMAL,
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
