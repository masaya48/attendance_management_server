import * as Express from 'express';
import {check, validationResult} from 'express-validator/check';
import {IConfig} from 'config';
import * as jwt from 'jsonwebtoken';
// import * as bcrypt from 'bcrypt';
import * as Sequelize from 'sequelize';
import * as Employee from 'models/m_employee';
import {AuthenticateService} from '../services/authenticate_service';

export const auth = (models:Sequelize.Models, config:IConfig) => {
  let router = Express.Router();
  const authService = new AuthenticateService(config);

  /* ログイン認証 */
  router.post(
    '/login',
    [ // バリデーションチェック
      check('employee_no', 'ユーザーIDを入力して下さい')
        .exists()
        .trim()
        .isLength({min:1}),
      check('password', 'パスワードを入力して下さい')
        .exists()
        .trim()
        .isLength({min:1})
    ],
    (req:Express.Request, res:Express.Response, next:Express.NextFunction) => {
      // バリデーション結果確認
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(403).json({errors: errors.mapped()});
      }

      // 処理
      let req_employee_no:string = req.body.employee_no || null;
      let req_password:string = req.body.password || null;
      const Employee = models.m_employee as Employee.Model;
      authService
        .login(Employee, req_employee_no, req_password)
        .then(body => {
          if (!body.token) {
            return res.status(403).json(body);
          }
          return res.json(body);
        });
    }
  );

  return router;
};
