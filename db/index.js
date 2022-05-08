const { Pool } = require('pg');

// connect to postgresql

const pool = new Pool({
  user: 'mosaab',
  host: 'localhost',
  database: 'cuts',
  password: '1234',
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
