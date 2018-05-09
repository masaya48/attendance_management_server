import * as Express from 'express';
import * as Config from 'config';
import * as jwt from 'jsonwebtoken';

const verifyToken = (token:string, config:Config.IConfig):Promise<boolean> => {
  const params = config.get('jwt');
  const secret_key = params['authentication_secret_key'];
  const algorithm = params['algorithm'];
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret_key, {algorithms: [algorithm]}, (err, decoded) => {
      if (err) {
        console.log('faild:' + JSON.stringify(decoded));
        resolve(false);
        return;
      }
      console.log('success:' + JSON.stringify(decoded));
      resolve(true);
      return;
    });
  });
};

export const login_guard:((config:Config.IConfig) => Express.RequestHandler) = ((config) => (req:Express.Request, res:Express.Response, next:Express.NextFunction) => {
  let header_auth = req.headers.authorization;
  const token = header_auth || req.query.token || req.body.token;
  verifyToken(token, config)
    .then((isSuccess:boolean) => {
      if (!isSuccess) {
        return res.status(403).send({error: 'message'});
      }
      next();
    });
});
