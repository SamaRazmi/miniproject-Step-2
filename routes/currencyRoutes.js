const express = require('express');
const router = express.Router();
const Currency = require('../models/Currency');

// Get all currencies
const getCurrencies = async (req, res) => {
  try {
    const currencies = await Currency.findAll();
    res.json(currencies);
  } catch (error) {
    console.error('Error fetching currencies:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get currency by ID
const getCurrencyById = async (req, res) => {
  const { id } = req.params;
  try {
    const currency = await Currency.findByPk(id);
    if (!currency) {
      return res.status(404).json({ error: 'Currency not found' });
    }
    res.json(currency);
  } catch (error) {
    console.error('Error fetching currency by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new currency
const createCurrency = async (req, res) => {
  const { currencyCode, countryId, conversionRate } = req.body;
  try {
    const currency = await Currency.create({
      currencyCode,
      countryId,
      conversionRate,
    });
    res.status(201).json(currency);
  } catch (error) {
    console.error('Error creating currency:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update currency rate
const updateCurrency = async (req, res) => {
  const { id, newRate } = req.params;
  try {
    const currency = await Currency.findByPk(id);
    if (!currency) {
      return res.status(404).json({ error: 'Currency not found' });
    }
    currency.conversionRate = newRate;
    await currency.save();
    res.json(currency);
  } catch (error) {
    console.error('Error updating currency:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete currency by ID
const deleteCurrency = async (req, res) => {
  const { id } = req.params;
  try {
    const currency = await Currency.findByPk(id);
    if (!currency) {
      return res.status(404).json({ error: 'Currency not found' });
    }
    await currency.destroy();
    res.json({ message: 'Currency deleted successfully' });
  } catch (error) {
    console.error('Error deleting currency:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Define routes without repeating the base route
router.get('/', getCurrencies);
router.get('/:id', getCurrencyById);
router.post('/', createCurrency);
router.put('/:id/:newRate', updateCurrency);
router.delete('/:id', deleteCurrency);

module.exports = router;
