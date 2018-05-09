import * as Express from 'express';
import * as jwt from 'jsonwebtoken';
const verifyToken = (token:string):Promise<boolean> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'tokenSecretKey', (err, decoded) => {
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
export const login_guard:(() => Express.RequestHandler) = (() => (req:Express.Request, res:Express.Response, next:Express.NextFunction) => {
  let header_auth = req.headers.authorization;
  console.log(header_auth);
  const token = header_auth || req.query.token || req.body.token;
  verifyToken(token)
    .then((isSuccess:boolean) => {
      if (!isSuccess) {
        return res.status(403).send({error: 'message'});
      }
      next();
    });
});
