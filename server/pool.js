// const { Pool } = require("pg");

// const pool = new Pool({
//   user: "pvmathew",
//   database: "metube",
// });

// module.exports = pool;

// using client since hobby-dev account on heroku has no connection pooling
const { Client } = require("pg");

let pgConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    }
  : {
      user: "pvmathew",
      database: "metube",
    };

const client = new Client(pgConfig);

client.connect();

module.exports = client;
