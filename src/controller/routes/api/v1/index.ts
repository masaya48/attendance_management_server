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
import holiday from './holiday'

const list = []
list.push(1, 2, 3)

export default function routes() {
  const router = Express.Router()

  // キャッシュデータ？テスト
  router.use(function(req, res, next) {
    if (req.body.f == 1) {
      list.push(10)
    }
    console.log(list)
    return next()
  })

  // 「public」認証
  router.use('/public', auth)

  // 「office_hours」
  router.use('/office_hours', validator.login_guard, office_hours)

  //「monthly_data」
  router.use('/monthly_data', validator.login_guard, monthly_data)

  //「holiday」
  router.use('/holiday', validator.login_guard, holiday)

  // ユーザーの権限確認(今は何もしていない)
  router.use('/manager', authority_gurd())
  router.use('/manager', (req, res, next) => {
    return res.status(200).json('にゃー')
  })

  return router
}
