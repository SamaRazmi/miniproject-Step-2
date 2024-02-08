const currencies = [
  {
    id: 1,
    currencyCode: 'CDN',
    country: 'Canada',
    conversionRate: 1,
  },
  {
    id: 2,
    currencyCode: 'USD',
    country: 'United States of America',
    conversionRate: 0.75,
  },
];

// GET Endpoint to retrieve all currencies
const getCurrencies = (request, response) => {
  response.json(currencies);
};

// GET:id Endpoint to retrieve a specific currency by ID
const getCurrencyById = (request, response) => {
  const id = parseInt(request.params.id);
  const currency = currencies.find((c) => c.id === id);
  if (currency) {
    response.json(currency);
  } else {
    response.status(404).send('Currency not found');
  }
};

// POST Endpoint to create a new currency
const createCurrency = (request, response) => {
  const newCurrency = request.body;
  if (
    !newCurrency ||
    !newCurrency.id ||
    !newCurrency.currencyCode ||
    !newCurrency.country ||
    !newCurrency.conversionRate
  ) {
    response.status(400).json({ error: 'content missing' });
  } else {
    currencies.push(newCurrency);
    response.json(newCurrency);
  }
};

// PUT:id Endpoint to update the conversion rate of a currency
const updateCurrency = (request, response) => {
  const id = parseInt(request.params.id);
  const newRate = parseFloat(request.params.newRate);
  const currency = currencies.find((c) => c.id === id);
  if (currency) {
    currency.conversionRate = newRate;
    response.json(currency);
  } else {
    response.status(404).send('Currency not found');
  }
};

// DELETE:id Endpoint to delete a currency by ID
const deleteCurrency = (request, response) => {
  const id = parseInt(request.params.id);
  const index = currencies.findIndex((c) => c.id === id);
  if (index !== -1) {
    currencies.splice(index, 1);
    response.sendStatus(204);
  } else {
    response.status(404).send('Currency not found');
  }
};

// Export the middleware functions
module.exports = {
  getCurrencies,
  getCurrencyById,
  createCurrency,
  updateCurrency,
  deleteCurrency,
};
