const express = require('express');
const router = express.Router();
const Currency = require('../models/Currency');
const Country = require('../models/Country');

// Define GET endpoint for "/currency-countryName" route
router.get('/currency-countryName', async (req, res) => {
  try {
    // Fetch currency code and country name, including the country model
    const currencies = await Currency.findAll({
      include: {
        model: Country, // Include the Country model
        attributes: ['name'], // Only select the 'name' attribute from Country
      },
      attributes: ['currencyCode'], // Select the 'currencyCode' attribute from Currency
    });

    // Map the result to get currency code and country name
    const currencyAndCountryNames = currencies.map((currency) => ({
      currencyCode: currency.currencyCode,
      countryName: currency.Country.name,
    }));

    // Send the response with currency code and country name
    res.json(currencyAndCountryNames);
  } catch (error) {
    console.error('Error fetching currency and country names:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
