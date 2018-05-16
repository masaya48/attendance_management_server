// node_modules
import * as Express from 'express'
import {check, body, validationResult} from 'express-validator/check'
import * as jwt from 'jsonwebtoken'
/* import * as bcrypt from 'bcrypt' */
// config
import config from './../../../../utils/config/my_config'
// validator
import validator from './../../../validator'
// adapters
import RequestAdapter from './../../../adapters/request/request_adapter'
import {ResponseAdapter} from './../../../adapters/response/response_adapter'
import LoginRequestAdapter from './../../../adapters/request/login_request_adapter'
import LoginResponseAdapter from './../../../adapters/response/login_response_adapter'
// sevices
import AuthenticateService from './../../../../domain/services/authenticate_service'
import AuthenticateService0 from './../../../../services/authenticate_service'
// DB(sequelize[mysql])
import sequelize from './../../../../libs/dbconn'
import models from './../../../../libs/models'
import Employee from 'models/m_employee'

// ========================================================================================
// 処理開始
// ========================================================================================
const router = Express.Router()
// const authService = new AuthenticateService0(config)
// const login = () => // バリデーションチェック
//   (req:Express.Request, res:Express.Response, next:Express.NextFunction) => {
//     // バリデーション結果確認
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//       console.log("test")
//       return res.status(401).json({status:401, message: '認証エラー', results: {errors: errors.mapped()}})
//     }

//     const responseEntity = loginResponseAdapter.convert(authenticateService.login(loginRequestAdapter.convert(req)))
//     res.status(responseEntity.status).json(responseEntity)
//     // 処理
//     let req_employee_no:string = req.body.employee_no || null
//     let req_password:string = req.body.password || null
//     const Employee = models.m_employee as Employee.Model
//     authService
//       .login(Employee, req_employee_no, req_password)
//       .then(body => {
//         if (!body.token) {
//           return res.status(403).json(body)
//         }
//         return res.json(body)
//       })
//   }
const authenticateService = new AuthenticateService()
const loginRequestAdapter = new LoginRequestAdapter()
const loginResponseAdapter = new LoginResponseAdapter()

/* ログイン認証 */
router.post('/login', validator.login, (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorResponse = validator.getErrorResponse(403, 'リクエストエラー', errors.mapped())
    return res.status(errorResponse.getStatus()).json(errorResponse.getBody())
  }

  const responseEntity = loginResponseAdapter.convert(authenticateService.login(loginRequestAdapter.convert(req)))
  return res.status(responseEntity.status).json(responseEntity)
})

export default router
