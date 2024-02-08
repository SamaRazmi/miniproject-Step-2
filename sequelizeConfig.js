const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

// Initialize Sequelize with the database variables from .env
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres', // Specify the dialect
    dialectOptions: {
      ssl: {
        require: true, // Set to true if your Postgres server requires SSL
        rejectUnauthorized: false, // Set to false if you want to ignore self-signed certificates
        // You may need to provide additional SSL options here, depending on your setup
      },
    },
  }
);

module.exports = sequelize;
