import * as Express from 'express';
import {check, validationResult} from 'express-validator/check';
import * as jwt from 'jsonwebtoken';
// import * as bcrypt from 'bcrypt';

import * as Sequelize from 'sequelize';
import * as Employee from 'models/m_employee';
module.exports = (models:Sequelize.Models) => {
  let router = Express.Router();
  const _jwtSecret = 'tokenSecretKey';

  /* ログイン認証 */
  router.post('/login', [
    check('employee_no', 'message')
      .exists(),
    check('password', 'message')
      .exists()
  ], (req:Express.Request, res:Express.Response, next:Express.NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(403).json({errors: errors.mapped()});
    }
    let req_employee_no:string = req.body.employee_no || null;
    let req_password:string = req.body.password || null;
    const Employee = models.m_employee;
    Employee.find({
      where: {
        employee_no: req_employee_no,
        password: req_password
      }
    })
    .then((employee:Employee.Instance) => {
      if (!employee) {
        return res.status(403).json({error: 'ユーザーIDもしくはパスワードが間違っています。'});
      } else {
        const {employee_no, user_no} = employee;
        let token = jwt.sign({employee_no, user_no}, _jwtSecret);
        employee.token = token;
        employee.save();
        return res.json({token: token});
      }
    });
  });

  return router;
};
