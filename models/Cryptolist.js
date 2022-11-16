const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Cryptolist extends Model {}

Cryptolist.init(
  {
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'cryptolist',
  }
);

module.exports = Cryptolist;
