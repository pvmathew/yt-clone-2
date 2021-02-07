const { Pool } = require("pg");

const pool = new Pool({
  user: "pvmathew",
  database: "metube",
});

module.exports = pool;
