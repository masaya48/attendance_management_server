// node_modules
import * as Express from 'express'
import { validationResult } from 'express-validator/check'
// config
import AuthenticateService from './../../domain/services/authenticate_service'
import ErrorResponse from '../../controller/http_entity/response/error_response'
import ErrorCode from './../../utils/constants/error_code'
import ErrorResponseAdapter from './../../controller/adapters/response/error_response_adapter'
import ApplicationError from '../../libs/errors/application_error';
import MEmployee from 'm_employee';

const errorResponseAdapter = new ErrorResponseAdapter()
const authService = new AuthenticateService()

const login_guard: (() => Express.RequestHandler) = (() => (req:Request, res:Express.Response, next:Express.NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorResponse = new ErrorResponse(ErrorCode.AuthError)
    return res.status(errorResponse.getStatus()).json(errorResponse.getBody())
  }

  // 認証用モジュールの読み込み
  let header_auth = req.headers.authorization
  const token = header_auth
  authService
    .verifyToken(token)
    .then(employee => {
      req.user = employee
      // 認証成功
      next()
    })
    .catch((err: ApplicationError) => {
      // 認証エラー
      const errorResponse = errorResponseAdapter.convert(err)
      return res.status(errorResponse.getStatus()).json(errorResponse.getBody())
    })
})

const authority_gurd:(() => Express.RequestHandler) = (() => (req:Express.Request, res:Express.Response, next:Express.NextFunction) => {
  const f = false
  if (f) {
    // エラー処理
    return res.status(400).json()
  }
  // 次の処理へ
  next()
})

interface Request extends Express.Request {
  user: MEmployee.Instance
}
export { login_guard, authority_gurd }
