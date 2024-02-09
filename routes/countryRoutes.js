const express = require('express');
const router = express.Router();
const Country = require('../models/Country');

// Get all countries
const getCountries = async (req, res) => {
  try {
    const countries = await Country.findAll();
    res.json(countries);
  } catch (error) {
    console.error('Error fetching countries:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new country
const createCountry = async (req, res) => {
  const { name } = req.body;
  try {
    const country = await Country.create({ name });
    res.status(201).json(country);
  } catch (error) {
    console.error('Error creating country:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete country by ID
const deleteCountry = async (req, res) => {
  const { id } = req.params;
  try {
    const country = await Country.findByPk(id);
    if (!country) {
      return res.status(404).json({ error: 'Country not found' });
    }
    await country.destroy();
    res.json({ message: 'Country deleted successfully' });
  } catch (error) {
    console.error('Error deleting country:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Define routes for countries
router.get('/', getCountries);
router.post('/', createCountry);
router.delete('/:id', deleteCountry);

module.exports = router;
