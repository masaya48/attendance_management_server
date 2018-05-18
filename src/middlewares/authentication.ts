import * as Express from 'express';
import * as Sequelize from 'sequelize';
import {validationResult} from 'express-validator/check'
import config from './../libs/config';
import validator from './../controller/validator'
import AuthenticateService from '../services/authenticate_service';
import models from './../libs/models'
import Employee from 'models/m_employee'

const login_guard:(() => Express.RequestHandler) = (() => (req:Express.Request, res:Express.Response, next:Express.NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorResponse = validator.getValidateErrorResponse(400, 'リクエストエラー', errors)
    return res.status(errorResponse.getStatus()).json(errorResponse.getBody())
  }

  // 認証用モジュールの読み込み
  const authService = new AuthenticateService(config);
  let header_auth = req.headers.authorization;
  const token = header_auth;
  const Employee = models.m_employee as Employee.Model;
  authService
    .verifyToken(Employee, token)
    .then((isSuccess:boolean) => {
      if (!isSuccess) {
        return res.status(403).send({error: 'message'});
      }
      next();
    });
});

const authority_gurd:(() => Express.RequestHandler) = (() => (req:Express.Request, res:Express.Response, next:Express.NextFunction) => {
  console.log('authority gurd.');
  next();
});

export {
  login_guard,
  authority_gurd
}
