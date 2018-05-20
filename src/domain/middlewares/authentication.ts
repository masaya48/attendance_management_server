// node_modules
import * as Express from 'express'
import * as Sequelize from 'sequelize'
import {validationResult} from 'express-validator/check'
// config
import config from './../../libs/config'
import validator from './../../controller/validator'
import AuthenticateService from './../services/authenticate_service'
import models from './../../libs/models'
import Employee from 'models/m_employee'
import ErrorResponse, { ErrorCodes } from '../../controller/http_entity/response/error_response';

const login_guard:(() => Express.RequestHandler) = (() => (req:Express.Request, res:Express.Response, next:Express.NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorResponse = validator.getValidateErrorResponse(errors)
    return res.status(errorResponse.getStatus()).json(errorResponse.getBody())
  }

  // 認証用モジュールの読み込み
  const authService = new AuthenticateService()
  let header_auth = req.headers.authorization
  const token = header_auth
  const Employee = models.m_employee as Employee.Model
  authService
    .verifyToken(token)
    .then((isSuccess:boolean) => {
      if (!isSuccess) {
        const errorResponse = new ErrorResponse(400, 'tokenチェックエラー', ErrorCodes.validationError)
        return res.status(errorResponse.getStatus()).json(errorResponse.getBody())
      }
      next()
    })
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
