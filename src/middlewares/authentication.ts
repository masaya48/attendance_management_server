import * as Express from 'express';
import * as Config from 'config';
import * as Sequelize from 'sequelize';
import {AuthenticateService} from '../services/authenticate_service';
import * as Employee from 'models/m_employee'

const login_guard:((models:Sequelize.Models, config:Config.IConfig) => Express.RequestHandler) = ((models, config) => (req:Express.Request, res:Express.Response, next:Express.NextFunction) => {
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
