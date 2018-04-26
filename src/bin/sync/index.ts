// ================================================================
// オプション設定
// ================================================================
import * as commander from 'commander';

require('./command_option')(commander);

// console.log(' optional: %j', commander.optional);
// console.log(' all: %j',    commander.all);
// console.log(' tables: %j', commander.tables);
// console.log(' args: %j',   commander.args);

// ================================================================
// 同期主処理
// ================================================================

const sync_all:boolean = commander.all;
const sync_tables:string[] = commander.tables;
const sync_options = commander.optional;

import * as Sequelize from 'sequelize';
import * as config from 'config';

const sequelize:Sequelize.Sequelize = require('../../libs/dbconn')(config);
const models:Sequelize.Models = require('../../libs/models')(sequelize);

// sequelize.models = models;
// console.log(sequelize.models);
console.log(sequelize.isDefined('m_employee'));

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

// 同期処理
if (sync_all === true || !sync_tables) {
  sequelize.beforeBulkSync(() => {
    console.log('sync start!');
    sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
  });
  sequelize.afterBulkSync(() => {
    console.log('sync end!');
    sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  });
    // 全テーブル同期
  sequelize
    .sync({force:false, alter: true})
    .then(done())
    .error(dberr());
} else if (sync_tables) {
  sequelize.beforeSync(() => {
    console.log('sync start!');
    sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
  });
  sequelize.afterSync(() => {
    console.log('sync end!');
    sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  });
  console.log('sync ' + sync_tables.length + ' tables. start');
  sync_tables.forEach((table) => {
    console.log('sync ' + table + '. start');
    const model = models[table];
    if (model) {
      model
        .sync({force: false, alter: true})
        .then(done())
        .error(dberr());
    } else {
      console.log('table:' + table + ' is not found.');
    }
  });
}