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
    price: {
      type: DataTypes.DECIMAL(20,6),
      allowNull: false,
    },
    market_cap: {
        type:DataTypes.BIGINT,
        allowNull: false
    },
    circulating_supply: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    max_supply: {
        type: DataTypes.BIGINT,
        allowNull: false,
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
