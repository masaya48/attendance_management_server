import * as Express from 'express';
import * as Config from 'config';
import {AuthenticateService} from '../services/authenticate_service';

const login_guard:((config:Config.IConfig) => Express.RequestHandler) = ((config) => (req:Express.Request, res:Express.Response, next:Express.NextFunction) => {
  // 認証用モジュールの読み込み
  const authService = new AuthenticateService(config);
  let header_auth = req.headers.authorization;
  const token = header_auth;
  authService
    .verifyToken(token, config)
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
