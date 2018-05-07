// import * as Sequelize from 'sequelize';
/**
 * 初期データ投入
 */
module.exports = (all:boolean, tables:string[], update:boolean, destroy:boolean) => {
  const seed = require('./seed_main')(all, tables, update, destroy);
  seed.then();
};