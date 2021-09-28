const { Pool } = require('pg')

const isProduction = process.env.NODE_ENV === 'production'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: !isProduction ? false : {
    rejectUnauthorized: false
  }
})

function createTableEditoras() {
  pool.query(`
    create table if not exists editora (
      id serial not null primary key,
      name varchar(50) not null,
      website varchar(50) not null
    );
  `)
}

module.exports = { pool, createTableEditoras }
