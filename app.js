const express = require('express');
const dotenv = require('dotenv').config({ path: `${__dirname}/config.env` });
const cookieParser = require('cookie-parser');
const cors = require('cors');
const globalErrorHandler = require('./conrollers/errorController');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const shoppingRoutes = require('./routes/shoppingRoutes');
const collectionRoutes = require('./routes/collectionRoutes');
const fileRoutes = require('./routes/imageRoutes');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');

const app = express();

app.enable('trust proxy');

if (process.env.NODE_ENV === 'development') {
  app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
}

if (process.env.NODE_ENV === 'production') {
  app.use(cors());
}

app.options('*', cors());

// Set security HTTP headers
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// parse json,cookie and url
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

app.use(compression());

// routes
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/shopping', shoppingRoutes);
app.use('/api/v1/collections', collectionRoutes);
app.use('/api/v1/images', fileRoutes);

// handling error
app.use(globalErrorHandler);

module.exports = app;
