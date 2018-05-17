import * as config from 'config'
import {Options} from 'sequelize'
export type jwt = {
  authentication_secret_key: string,
  algorithm: string
}
export type sequelize = {
  database: string,
  username: string,
  password: string,
  options: Options
}
export type server = {
  port: number
}
interface MyConfig extends config.IConfig {
  sequelize: sequelize,
  jwt: jwt,
  server: server
}
export default config as MyConfig
