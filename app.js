const express = require('express');
const dotenv = require('dotenv').config({ path: `${__dirname}/config.env` });
const cookieParser = require('cookie-parser');
const cors = require('cors');

const globalErrorHandler = require('./conrollers/errorController');

// export routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const shoppingRoutes = require('./routes/shoppingRoutes');
const collectionRoutes = require('./routes/collectionRoutes');
const fileController = require('./conrollers/fileController');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
}

app.options('*', cors());

if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

// parse json,cookie and url
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
// routes
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/shopping', shoppingRoutes);
app.use('/api/v1/collections', collectionRoutes);
app.get('/api/v1/images/:filename', fileController.getImage);

// handling error
app.use(globalErrorHandler);

module.exports = app;
