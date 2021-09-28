const { Pool } = require('pg')

const isProduction = process.env.NODE_ENV === 'production'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: !isProduction ? false : {
    rejectUnauthorized: false
  }
})

function createTableUsers() {
  pool.query(`
    create table if not exists users (
      id serial not null primary key,
      name varchar(50) not null,
      email varchar(50) not null,
      password varchar(30) not null,
      nick varchar(12) not null
    );

    INSERT INTO users (
      name,
      email,
      password,
      nick
    ) VALUES (
      'Paulo',
      'paulo@paulo.com',
      'paulo',
      'paulowsky'
    );

    INSERT INTO users (
      name,
      email,
      password,
      nick
    ) VALUES (
      'Daniel',
      'daniel@daniel.com',
      'daniel',
      'danielzao'
    );
  `)
}

module.exports = { pool, createTableUsers }
