// node_modules
import * as Express from 'express'
import * as Sequelize from 'sequelize'
import {validationResult} from 'express-validator/check'
// config
import config from './../../libs/config'
import validator from './../../controller/validator'
import AuthenticateService from './../../domain/services/authenticate_service'
import models from './../../libs/models'
import Employee from 'models/m_employee'
import ErrorResponseDTO from './../../domain/dto/response/error_response_dto'
import { ErrorResponse, ErrorCode } from '../../controller/http_entity/response/error_response';
import ErrorResponseAdapter from './../../controller/adapters/response/error_response_adapter'

const errorResponseAdapter = new ErrorResponseAdapter()
const authService = new AuthenticateService()

const login_guard:(() => Express.RequestHandler) = (() => (req:Express.Request, res:Express.Response, next:Express.NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorResponse = new ErrorResponse(401, '認証エラー', ErrorCode.test1)
    return res.status(errorResponse.getStatus()).json(errorResponse.getBody())
  }

  // 認証用モジュールの読み込み
  let header_auth = req.headers.authorization
  const token = header_auth
  authService
    .verifyToken(token)
    .then(
      () => {
        // if (!isSuccess) {
        //   const errorResponse = new ErrorResponse(400, 'tokenチェックエラー', ErrorCodes.validationError)
        //   return res.status(errorResponse.getStatus()).json(errorResponse.getBody())
        // }
        next()
      },
      ( err: ErrorResponseDTO ) => {
        const errorResponse = errorResponseAdapter.convert(err, ErrorCode.test1)
        return res.status(errorResponse.getStatus()).json(errorResponse.getBody())
      }
    )
})

const authority_gurd:(() => Express.RequestHandler) = (() => (req:Express.Request, res:Express.Response, next:Express.NextFunction) => {
  console.log('authority gurd.');
  const f = false
  if (f) {
    // エラー処理
    return res.status(400).json()
  }
  // 次の処理へ
  next();
});

export {
  login_guard,
  authority_gurd
}
