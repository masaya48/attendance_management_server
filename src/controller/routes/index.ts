// node_modules
import * as Express from 'express'
import * as Config from 'config'
import * as Sequelize from 'sequelize'

// middlewares
import {login_guard, authority_gurd} from '../../middlewares/authentication'

// routes
import auth from './auth'
import users from './users'
import test from './test'

export default function routes(app:Express.Express, config:Config.IConfig) {
  // DB設定読み込み
  const sequelize:Sequelize.Sequelize = require('../libs/dbconn')(config);
  // モデルを設定
  const models:Sequelize.Models = require('../libs/models')(sequelize);

  // 「/auth」認証
  app.use('/auth', auth(models, config));

  // ユーザー認証の確認処理
  app.use(login_guard(models, config));

  // 「/test」
  app.use('/test', test());

  // 「/users」
  app.use('/users', users(models));

  // ユーザーの権限確認(今は何もしていない)
  app.use('/manager', authority_gurd());
  app.use('/manager', (req, res, next) => {})
}
