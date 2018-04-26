import * as Express from 'express';
import * as Sequelize from 'sequelize';
const
  done = (res:Express.Response) => {
    return () => {
      res.send('Done.¥n');
    }
  },
  dberr = (res:Express.Response) => {
    return (e:Error) => {
      res.statusCode = 500;
      res.send(e);
    }
  }

module.exports = {
  all: (sequelize:Sequelize.Sequelize) => {
    return (req:Express.Request, res:Express.Response) => {
      sequelize.sync(req.body).then(done(res)).error(dberr(res));
    }
  },
  one: (models:Sequelize.Models) => {
    return (req:Express.Request, res:Express.Response) => {
      const model = models[req.params.table];
      if (model !== undefined) {
        model.sync(req.body).then(done(res)).error(dberr(res));
      } else {
        res.send(404);
      }
    }
  }
}
