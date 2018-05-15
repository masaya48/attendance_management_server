// node_modules
import * as Express from 'express'
import * as Config from 'config'
import * as Sequelize from 'sequelize'

// middlewares
import {login_guard, authority_gurd} from '../../../../middlewares/authentication'

// routes
import auth from './auth'
import users from './users'
import test from './test'

// others
import dbconn from './../../../../libs/dbconn'
import getModels from './../../../../libs/models'

export default function routes(config:Config.IConfig) {
  const router = Express.Router()
  // DB設定読み込み
  const sequelize:Sequelize.Sequelize = dbconn(config)
  // モデルを設定
  const models:Sequelize.Models = getModels(sequelize)

  // 「/auth」認証
  router.use('/auth', auth(models, config))

  // ユーザー認証の確認処理
  router.use(login_guard(models, config))

  // 「/test」
  router.use('/test', test())

  // 「/users」
  router.use('/users', users(models))

  // ユーザーの権限確認(今は何もしていない)
  router.use('/manager', authority_gurd())
  router.use('/manager', (req, res, next) => {})
  return router
}
