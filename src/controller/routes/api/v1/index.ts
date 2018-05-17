// node_modules
import * as Express from 'express'
import * as Config from 'config'
// utils
import config from './../../../../libs/config'
// middlewares
import {login_guard, authority_gurd} from '../../../../middlewares/authentication'
// routes
import auth from './auth'
import users from './users'
import test from './test'
// others
import sequelize from './../../../../libs/dbconn'
import models from './../../../../libs/models'

import validator from './../../../validator'

export default function routes() {
  const router = Express.Router()

  // 「/auth」認証
  router.use('/auth', auth)

  // ユーザー認証の確認処理
  router.use(validator.login_guard, login_guard())

  // 「/test」
  router.use('/test', test())

  // 「/users」
  router.use('/users', users(models))

  // ユーザーの権限確認(今は何もしていない)
  router.use('/manager', authority_gurd())
  router.use('/manager', (req, res, next) => {})

  return router
}
