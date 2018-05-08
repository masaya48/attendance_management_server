import * as Express from 'express';
import * as jwt from 'jsonwebtoken';
const verifyToken = (token:string):Promise<boolean> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'tokenSecretKey', (err, decode) => {
      if (err) {
        resolve(false);
        return;
      }
      resolve(true);
      return;
    });
  });
};
export const login_guard: (() => Express.RequestHandler) = (() => (req:Express.Request, res:Express.Response, next:Express.NextFunction) => {
    const token = req.body.token;
    verifyToken(token)
      .then((isSuccess:boolean) => {
        if (!isSuccess) {
          return res.status(403).send({error: 'message'});
        }
        next();
      });
});
