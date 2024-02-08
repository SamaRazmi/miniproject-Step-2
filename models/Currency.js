const { DataTypes } = require('sequelize');
const sequelize = require('../sequelizeConfig');
const Country = require('./Country'); // Import the Country model

const Currency = sequelize.define('Currency', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  currencyCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  countryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Country, // Reference to the Country model
      key: 'id',
      //deferrable: 'INITIALLY_IMMEDIATE', // Optional, depends on your database setup
    },
  },
  conversionRate: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Currency;
