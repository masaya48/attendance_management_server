import * as Sequelize from 'sequelize';
/**
 * 同期
 * 
 * @param all
 * @param tables
 * @param options
 */
module.exports = (all:boolean, tables:string[],options:Sequelize.SyncOptions) => {
  const sync = require('./sync_main')(all, tables, options);
  sync.then();
};
