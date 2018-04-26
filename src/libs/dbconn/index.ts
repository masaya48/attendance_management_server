import * as Config from 'config';
import * as Sequelize from 'sequelize';
/**
 * config.sequelize = {
 *   database: <String>,
 *   username: <String>,
 *   password: <String>,
 *   options:  <Object>
 * }
 */
module.exports = (config:Config.IConfig) => {
  let params = config.get('sequelize') || {};
//  params['options'] = params['options'] || {};

  console.log(
      'Sequelize connecting to %s on %s as %s',
      params['database'], params['options']['host'] || 'localhost', params['username']);

  return new Sequelize(
    params['database'],
    params['username'],
    params['password'],
    params['options']);
}