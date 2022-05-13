const express = require('express');
const dotenv = require('dotenv').config({ path: `${__dirname}/./config.env` });
const cookieParser = require('cookie-parser');
const cors = require('cors');
const globalErrorHandler = require('./conrollers/errorController');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const shoppingRoutes = require('./routes/shoppingRoutes');
const orderRoutes = require('./routes/orderRoutes');
const collectionRoutes = require('./routes/collectionRoutes');
const fabricRoutes = require('./routes/fabricRoutes');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');
const path = require('path');
const shoppingController = require('./conrollers/shoppingController');

const app = express();

// app.enable('trust proxy');

// if (process.env.NODE_ENV === 'development') {
//   app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
// }

// if (process.env.NODE_ENV === 'production') {
// }

app.use(cors({ credentials: true, origin: true }));

app.options('*', cors());

// Set security HTTP headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          'https://cuts-clone-mern.herokuapp.com',
        ],
        styleSrc: ["'self'", 'https://fonts.googleapis.com', "'unsafe-inline'"],
        imgSrc: ["'self'", 'data: https:', 'https://*.com'],
        fontSrc: ["'self'", 'https://*.com', 'data:'],
      },
    },
  })
);

const morgan = require('morgan');
app.use(morgan('dev'));

// Limit requests from same API
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

app.post(
  '/webhook-checkout',
  express.raw({ type: 'application/json' }),
  shoppingController.webhookCheckout
);

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
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/collections', collectionRoutes);
app.use('/api/v1/fabrics', fabricRoutes);

// // react
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'client')));
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/client/index.html'));
//   });
// }

// handling error
app.use(globalErrorHandler);

module.exports = app;
