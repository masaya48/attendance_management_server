import config from './../config'
import * as Sequelize from 'sequelize'
/**
 * config.sequelize = {
 *   database: <String>,
 *   username: <String>,
 *   password: <String>,
 *   options:  <Sequelize.Options>
 * }
 */
let params = config.sequelize
if (!params || !params.options) {
  throw new Error('configration parameters not found.')
}

console.log(
    'Sequelize connecting to %s on %s as %s',
    params.database, params.options.host || 'localhost', params.username)

const sequelize = new Sequelize(
  params.database,
  params.username,
  params.password,
  params.options)

export default sequelize
