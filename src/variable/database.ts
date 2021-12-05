import knex from 'knex'
export const db = knex({
  client: 'mysql',
  connection: {
    host: 'host',
    port: 3306,
    user: 'username',
    database: 'discord'
  }
})
