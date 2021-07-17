const app = require('./app');
const mongoose = require('mongoose');

const DB = process.env.DATABASE;

// connect to DB
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful !!');
  });

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}....`);
});
