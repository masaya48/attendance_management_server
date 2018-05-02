// import * as Sequelize from 'sequelize';
/**
 * 初期データ投入
 */
module.exports = (all:boolean, tables:string[], destroy:boolean) => {
  const seed = require('./seed_main')(all, tables, destroy);
  seed.then();
};