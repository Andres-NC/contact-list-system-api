const {Pool} = require('pg');
const {config} = require('../config');

class PostgresqlDB {
  constructor() {
    this.pool = new Pool({
      user: config.dbUser,
      host: config.dbHost,
      database: config.dbName,
      password: config.dbPassword,
      port: config.dbPassword,
    });
  }

  async query(query, params) {
    return await this.pool.query(query, params);
  }
}

module.exports = PostgresqlDB;
