import * as Express from 'express';
import * as Sequelize from 'sequelize';
module.exports = (models:Sequelize.Models) => {
  let router = Express.Router();

  // 全社員情報取得
  router.get('/all', (req:Express.Request, res:Express.Response, next:Express.NextFunction) => {
    const Employee = models.m_employee;
    Employee.findAll().then((column) => {
      for (let i = 0; i < column.length; i++) {
        console.log(column[i].toJSON());
      }
      res.send(column);
    });
  });

  // アクセスURL返すだけ
  router.get('/url', (req:Express.Request, res:Express.Response, next:Express.NextFunction) => {
    res.send(req.baseUrl + ' + ' + req.url + ' → ' + req.originalUrl);
  });

  // POSTアクセス
  router.post('/', (req:Express.Request, res:Express.Response, next:Express.NextFunction) => {
    res.send('POST');
  });

  return router;
}
