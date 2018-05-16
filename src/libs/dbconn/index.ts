import * as Config from 'config'
import * as Sequelize from 'sequelize'
import * as my_config from 'my-config'
/**
 * config.sequelize = {
 *   database: <String>,
 *   username: <String>,
 *   password: <String>,
 *   options:  <Object>
 * }
 */
//export default function dbconn(config:Config.IConfig) {
  let params = Config.get<my_config.sequelize_config>('sequelize')
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
//}
