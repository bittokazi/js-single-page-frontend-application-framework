require("dotenv").config();

const env = process.env._NODE_ENV || "development";
const dbConfig = require("./../config/DatabaseConfig")[env];

const cn = {
  host: dbConfig.host,
  port: dbConfig.port,
  database: dbConfig.database,
  user: dbConfig.username,
  password: dbConfig.password,
};

const pgp = require("pg-promise")({});

const pg = pgp(cn);

module.exports = pg;
