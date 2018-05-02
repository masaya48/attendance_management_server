import * as Sequelize from 'sequelize';
import * as Config from 'config';
import * as Bluebird from 'bluebird';
// const Connection = require('../connection');

module.exports = (all:boolean, tables:string[]) => {
  // connectionを取得
  // const con = new Connection(Config);
  // const sequelize:Sequelize.Sequelize = con.getSequelize();
  // const models:Sequelize.Models = con.getModels();
  const sequelize:Sequelize.Sequelize = require('../../libs/dbconn')(Config);
  const models:Sequelize.Models = require('../../libs/models')(sequelize);
  const seeds = require('../../libs/seeds')();
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
  if (all || !tables || tables.length === 0) {
    return Bluebird
      .resolve()
      .then(() => {
        // seedの前処理
        return sequelize
          .query('SET FOREIGN_KEY_CHECKS = 0;');
      })
      .then(() => {
        // seedの主処理
        return Bluebird.all(Object.keys(seeds).map(seedName => {
          const model = models[seedName];
          const seed = seeds[seedName];
          if (model && seed) {
            return model
              .bulkCreate(seed);
          } else {
            console.log('seed ' + seedName + ' is not found.');
          }
        }))
      })
      .then(done())
      .finally(() => {
        // seedの後処理
        return sequelize
          .query('SET FOREIGN_KEY_CHECKS = 1;')
          .finally(() => {
            return sequelize.close();
          });
      });
  } else if (tables && tables.length > 0) {
    return Bluebird
      .resolve()
      .then(() => {
        // seedの前処理
        return sequelize
          .query('SET FOREIGN_KEY_CHECKS = 0;');
      })
      .then(() => {
        // seedの主処理
        return Bluebird.all(tables.map((tableName) => {
          const model = models[tableName];
          const seed = seeds[tableName];
          if (model && seed) {
            return model
              .bulkCreate(seed);
          } else {
            console.log('seed ' + tableName + ' is not found.');
          }
        }));
      })
      .then(done())
      .finally(() => {
        // seedの後処理
        return sequelize
          .query('SET FOREIGN_KEY_CHECKS = 1;')
          .finally(() => {
            return sequelize.close();
          });
      })
      .error(dberr());
  }
};
