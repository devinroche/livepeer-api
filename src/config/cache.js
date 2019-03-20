const redis = require('redis');
import logger from './winston';
require('dotenv').config();

export const client = redis.createClient({
  host: process.env.REDIS_URL,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
});

// not working yet
export const getUser = (address) => {
  client.get(address.toLowerCase(), async (err,value) => {
    if (err) {
      return 0
    } else if(value === null) {
      return 1
    } else {
      return JSON.parse(value);
    }
  });
}

export const save = (address, data) => {
  client.set(address, JSON.stringify(data), 'EX', 60 * 60 * 12, (err) => {
    if (err) {
      throw err;
    }
  });
}

client.on('error', function (er) {
  logger.error(er.stack) // [2]
})
