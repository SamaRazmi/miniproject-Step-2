const sequelize = require('./sequelizeConfig');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

// Setup for CORS, JSON parsing, and Morgan middleware
app.use(cors());
app.use(express.json());
//app.use(morgan('dev'));

// Morgan middleware for logging with custom format
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      JSON.stringify(req.body),
    ].join(' ');
  })
);

// Import routes
const currencyRoutes = require('./routes/currencyRoutes');
const countryRoutes = require('./routes/countryRoutes');
const currencyCountryNameRoute = require('./routes/currencyCountryNameRoute'); // Import currency-countryName route

// Use routes without repeating the base route
app.use('/api/currency', currencyRoutes);
app.use('/api/country', countryRoutes);
app.use('/api', currencyCountryNameRoute); // Use currency-countryName route

// Test database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log(
      'Connection to the database has been established successfully.'
    );

    // Sync models with the database and force dropping tables if they exist
    await sequelize.sync({ force: true });
    console.log('Models synchronized with the database and tables recreated.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Server listening on port 3001
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

// Unknown endpoint handling
app.use((request, response) => {
  response.status(404).json({ error: 'unknown endpoint' });
});
