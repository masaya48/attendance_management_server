// node_modules
import * as Express from 'express'
import {check, body, validationResult} from 'express-validator/check'
import * as Config from 'config'
import * as jwt from 'jsonwebtoken'
import * as Sequelize from 'sequelize'
import * as Employee from 'models/m_employee'
/* import * as bcrypt from 'bcrypt' */
// adapters
import RequestAdapter from './../../../adapters/request/request_adapter'
import {ResponseAdapter} from './../../../adapters/response/response_adapter'
import LoginRequestAdapter from './../../../adapters/request/login_request_adapter'
import LoginResponseAdapter from './../../../adapters/response/login_response_adapter'
// sevices
import AuthenticateService from './../../../../domain/services/authenticate_service'
import AuthenticateService0 from './../../../../services/authenticate_service'

export default function auth(models:Sequelize.Models, config:Config.IConfig) {
  const router = Express.Router()
  const authService = new AuthenticateService0(config)
  const authenticateService = new AuthenticateService()
  const loginRequestAdapter = new LoginRequestAdapter()
  const loginResponseAdapter = new LoginResponseAdapter()

  const login = [ // バリデーションチェック
    body('employee_no', 'ユーザーIDを入力して下さい')
      .exists()
      .trim()
      .isLength({min:1}),
    body('password', 'パスワードを入力して下さい')
      .exists()
      .trim()
      .isLength({min:1}),
    (req:Express.Request, res:Express.Response, next:Express.NextFunction) => {
      // バリデーション結果確認
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(401).json({status:401, message: '認証エラー', results: {errors: errors.mapped()}})
      }

      const responseEntity = loginResponseAdapter.convert(authenticateService.login(loginRequestAdapter.convert(req)))
      res.status(responseEntity.status).json(responseEntity)
      // 処理
      let req_employee_no:string = req.body.employee_no || null
      let req_password:string = req.body.password || null
      const Employee = models.m_employee as Employee.Model
      authService
        .login(Employee, req_employee_no, req_password)
        .then(body => {
          if (!body.token) {
            return res.status(403).json(body)
          }
          return res.json(body)
        })
    }
  ]

  /* ログイン認証 */
  router.post('/login', login)

  return router
}
