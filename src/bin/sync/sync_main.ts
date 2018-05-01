import * as Sequelize from 'sequelize';
import * as Config from 'config';
import * as Bluebird from 'bluebird';
/**
 * 同期主処理
 * 
 * @param all
 * @param tables
 * @param options
 */
module.exports = (all:boolean, tables:string[], options:Sequelize.SyncOptions):Bluebird<any> => {
  const Connection = require('../connection');
  const con = new Connection(Config);
//  const sequelize:Sequelize.Sequelize = require('../../libs/dbconn')(Config);
//  const models:Sequelize.Models = require('../../libs/models')(sequelize);
  const sequelize:Sequelize.Sequelize = con.getSequelize();
  const models:Sequelize.Models = con.getModels();
  const done = () => {
    return () => {
      console.log('sync success!');
    }
  };
  const dberr = () => {
    return (e:Error) => {
      console.log('sync faild!');
    }
  };
  const connectionClose = () => {
    return sequelize
      .close()
      .then(() => {
        console.log('connection close.');
      })
      .error(dberr());
  };
  if (all == true || !tables || tables.length === 0) {
    // 全テーブル同期
    return new Bluebird(() => {
      // 同期[sequelize.sync()]の前処理
      sequelize.beforeBulkSync(() => {
        return sequelize
          .query('SET FOREIGN_KEY_CHECKS = 0');
      });
      // 同期[sequelize.sync()]の後処理
      sequelize.afterBulkSync(() => {
        return sequelize
          .query('SET FOREIGN_KEY_CHECKS = 1')
          .finally(() => {
//            return connectionClose();
            return con.closeConnection();
          });
      });
      // 同期主処理
      return sequelize
        .sync(options)
        .then(done())
        .error(dberr());
    })
  } else if (tables && tables.length > 0) {
    // 指定されたテーブルを同期
    return Bluebird
      .resolve()
      .then(() => {
        // 同期の前処理
        return sequelize
          .query('SET FOREIGN_KEY_CHECKS = 0');
      })
      .then(() => {
        // 同期主処理
        return Bluebird.all(tables.map((table) => {
          const model = models[table];
          if (model) {
            return model
              .sync(options);
          } else {
            console.log('table ' + table + ' is not found.');
          }          
        }));
      })
      .then(done())
      .finally(() => {
        // 同期後処理
        return sequelize
          .query('SET FOREIGN_KEY_CHECKS = 1')
          .finally(() => {
//            return connectionClose();
            return con.closeConnection();
          });
      })
      .error(dberr());
  }
  return new Bluebird(() => {
    return dberr();
  });
};