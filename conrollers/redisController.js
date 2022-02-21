const { createClient } = require('redis');

const client = createClient();
(async () => {
  await client.connect();
})();

async function getOrSetCache(key, cb) {
  const expireTime = process.env.DEFAULT_EXPIRATION;

  // 1) get data from redis cach
  let data = await client.get(key);
  // 2) if data does exist return it
  if (data !== null) return JSON.parse(data);
  // 3) find data from database using cb
  data = await cb();
  // 4) set data to redis cach
  await client.setEx(key, expireTime, JSON.stringify(data));
  // 4) return data
  return data;
}

module.exports = { getOrSetCache };
