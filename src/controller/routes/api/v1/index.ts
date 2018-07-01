// node_modules
import * as Express from 'express'
// middlewares
import { authority_gurd } from './../../../middlewares/authentication'
//
import validator from './../../../validator'
// routes
import auth from './auth'
import office_hours from './office_hours'
import monthly_data from './monthly_data'

export default function routes() {
  const router = Express.Router()

  // 「/public」認証
  router.use('/public', auth)

  // ユーザー認証の確認処理
  // router.use(validator.login_guard, login_guard())

  // 「office_hours」認証
  router.use('/office_hours', validator.login_guard, office_hours)

  //「monthly_data」
  router.use('/monthly_data', validator.login_guard, monthly_data)

  // ユーザーの権限確認(今は何もしていない)
  router.use('/manager', authority_gurd())
  router.use('/manager', (req, res, next) => {
    return res.status(200).json('にゃー')
  })

  return router
}
