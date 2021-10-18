import knex from 'knex'
export const db = knex({
  client: 'mysql',
  connection: {
    host: 'th-release.kro.kr',
    port: 3306,
    user: 'cth',
    database: 'th-nol'
  }
})
