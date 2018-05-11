import * as config from 'config'
import * as Sequelize from 'sequelize'
declare let my_config;
declare namespace my_config {
  // sequelize設定
  interface sequelize_config {
    readonly database?: string;
    readonly username?: string;
    readonly password?: string;
    readonly options?: Sequelize.Options;
  }
  // jwt設定
  interface jwt_config {
    readonly authentication_secret_key: string;
    readonly algorithm: string;
  }
  // その他
  interface other {
    readonly [index: string]: any;
  }
}
export = my_config;
