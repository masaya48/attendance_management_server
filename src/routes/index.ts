import * as express from 'express';
import * as config from 'config';
import {login_guard} from '../middlewares/authentication';
import {auth} from './auth';
import {users} from './users';
module.exports = (app:express.Express, config:config.IConfig) => {
  // DB設定読み込み
  const sequelize = require('../libs/dbconn')(config);
  // モデルを設定
  const models = require('../libs/models')(sequelize);

  // Database migration(DBの再構築)
  // NODE_ENV = developmentの時のみ動作
  // let env = app.get('env');
  // if (env === 'development') {
  //   let sync = require('./sync');
  //   app.post('/devel/sync/:table', sync.one(models));
  //   app.post('/devel/sync', sync.all(sequelize));
  // }

//  const auth = require('./auth')(models);
  app.use('/auth', auth(models, config));

  // ユーザー認証の確認処理
  app.use(login_guard(config));

  const test = require('./test');
  app.use('/test', test);

  // const users = require('./users')(models);
  app.use('/users', users(models));
}
