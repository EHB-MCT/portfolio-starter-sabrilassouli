require('dotenv').config();
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      //user: process.env.DB_USER,
      user: 'sabri',
      //password: process.env.DB_PASSWORD,
      password: 'amazingpassword',
      //database: process.env.DB_NAME,
      database: 'forumDatabase',
    },
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './../db/seeds',
    },
  },
  test: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      migrations: {
        directory: './migrations'
      },
    }
  }
};