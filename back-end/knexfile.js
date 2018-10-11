module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/job_board',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: `${__dirname}/db/seeds/dev`
    },
    useNullAsDefault: true
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/job_board_test',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: `${__dirname}/db/seeds/test`
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + `?ssl=true`,
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
};
