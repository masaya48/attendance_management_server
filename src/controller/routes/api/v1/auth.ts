// node_modules
import * as Express from 'express'
import {check, body, validationResult} from 'express-validator/check'
import * as jwt from 'jsonwebtoken'
/* import * as bcrypt from 'bcrypt' */
// config
import config from './../../../../libs/config'
// validator
import validator from './../../../validator'
// dto
import ErrorResponseDTO from './../../../../domain/dto/response/error_response_dto'
// adapters
import LoginRequestAdapter from './../../../adapters/request/login_request_adapter'
import LoginResponseAdapter from './../../../adapters/response/login_response_adapter'
// sevices
import AuthenticateService from './../../../../domain/services/authenticate_service'
// DB(sequelize[mysql])
import sequelize from './../../../../libs/dbconn'
import models from './../../../../libs/models'
import Employee from 'models/m_employee'

// ========================================================================================
// 処理開始
// ========================================================================================
const router = Express.Router()

const authenticateService = new AuthenticateService()
const loginRequestAdapter = new LoginRequestAdapter()
const loginResponseAdapter = new LoginResponseAdapter()

/* ログイン認証 */
router.post('/login', validator.login, (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  // バリデーションチェック
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorResponse = validator.getValidateErrorResponse(400, 'リクエストエラー', errors)
    return res.status(errorResponse.getStatus()).json(errorResponse.getBody())
  }

  // ログイン認証処理
  return authenticateService
    .login(loginRequestAdapter.convert(req))
    .then(
      ( requestDto ) => {
        const responseEntity = loginResponseAdapter.convert(requestDto)
        return res.status(responseEntity.status).json(responseEntity)
      },
      ( err: ErrorResponseDTO ) => {
        return res.status(err.getStatus()).json({message: err.getMessage()})
      }
    )
})

export default router
