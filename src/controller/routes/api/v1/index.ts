// node_modules
import * as Express from 'express'
// middlewares
import { login_guard, authority_gurd } from './../../../middlewares/authentication'
//
import validator from './../../../validator'
// routes
import auth from './auth'
import users from './users'
import test from './test'
import office_hours from './office_hours'

export default function routes() {
  const router = Express.Router()

  // 「/public」認証
  router.use('/public', auth)

  // ユーザー認証の確認処理
  // router.use(validator.login_guard, login_guard())

  // 「office_hours」認証
  router.use('/office_hours', validator.login_guard, office_hours)

  // 「/test」
  router.use('/test', validator.login_guard, test())

  // 「/users」
  router.use('/users', validator.login_guard, users())

  // ユーザーの権限確認(今は何もしていない)
  router.use('/manager', authority_gurd())
  router.use('/manager', (req, res, next) => {
    return res.status(200).json('にゃー')
  })

  return router
}
