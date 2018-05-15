// node_modules
import * as Express from 'express';
import * as Sequelize from 'sequelize';

// mytypes
import * as Employee from 'models/m_employee';

export default function users(models:Sequelize.Models) {
  let router = Express.Router();

  // 全社員情報取得
  router.get('/all', (req:Express.Request, res:Express.Response, next:Express.NextFunction) => {
    const Employee = models.m_employee as Employee.Model;
    Employee.findAll().then((column) => {
      res.send(column);
    });
  });
/*
{
   where: Sequelize.and(
     { name: 'a project' },
     Sequelize.or(
       { id: [1,2,3] },
       { id: { gt: 10 } }
     )
   )
}
*/
  // アクセスURL返すだけ
  router.get('/url', (req:Express.Request, res:Express.Response, next:Express.NextFunction) => {
    res.send(req.baseUrl + ' + ' + req.url + ' → ' + req.originalUrl);
  });
  router.post('/test', (req:Express.Request, res:Express.Response, next:Express.NextFunction) => {
    const Employee = models.m_employee;
    Employee.findById(1).then((employee:Employee.Instance) => {
      res.send(employee.employee_name);
    });
  });

  // POSTアクセス
  router.post('/', (req:Express.Request, res:Express.Response, next:Express.NextFunction) => {
    res.send('POST');
  });

  return router;
}
