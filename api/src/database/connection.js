const knex = require('knex');
const configuration = require('../../knexfile');

let config = ''

if (process.env.NODE_ENV === 'test') {
  config = configuration.test
} else if (process.env.NODE_ENV === 'production') {
  config = configuration.production
} else {
  config = configuration.development
}

const connection = knex(config);

module.exports = connection;
