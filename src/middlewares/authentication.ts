import * as Express from 'express';
import * as Config from 'config';
import {authenticate_service} from '../services/authenticate_service';

export const auth_guard:((config:Config.IConfig) => Express.RequestHandler) = ((config) => (req:Express.Request, res:Express.Response, next:Express.NextFunction) => {
  // 認証用モジュールの読み込み
  const authService = new authenticate_service(config);
  let header_auth = req.headers.authorization;
  const token = header_auth || req.query.token || req.body.token;
  authService
    .verifyToken(token, config)
    .then((isSuccess:boolean) => {
      if (!isSuccess) {
        return res.status(403).send({error: 'message'});
      }
      next();
    });
});
