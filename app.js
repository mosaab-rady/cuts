const express = require('express');
const dotenv = require('dotenv').config({ path: `${__dirname}/config.env` });

const globalErrorHandler = require('./conrollers/errorController');

// export routes
const productRoutes = require('./routes/productRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

// parse json and url
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// routes
app.use('/api/v1/products', productRoutes);

// handling error
app.use(globalErrorHandler);

module.exports = app;
