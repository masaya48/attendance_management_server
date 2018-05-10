import * as express from 'express';
import * as config from 'config';
import * as Sequelize from 'sequelize';
import {login_guard, authority_gurd} from '../middlewares/authentication';
import {auth} from './auth';
import {users} from './users';
import {test} from './test';
module.exports = (app:express.Express, config:config.IConfig) => {
  // DB設定読み込み
  const sequelize:Sequelize.Sequelize = require('../libs/dbconn')(config);
  // モデルを設定
  const models:Sequelize.Models = require('../libs/models')(sequelize);

  // 認証
  app.use('/auth', auth(models, config));

  // ユーザー認証の確認処理
  app.use(login_guard(config));

  // 「/test」
  app.use('/test', test());

  // /users
  app.use('/users', users(models));

  // ユーザーの権限確認
  app.use(authority_gurd());


}
