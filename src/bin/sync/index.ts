import * as Sequelize from 'sequelize'
import syncMain from './sync_main'
/**
 * 同期
 * 
 * @param all
 * @param tables
 * @param options
 */
export default function sync(all:boolean, tables:string[],options:Sequelize.SyncOptions):void {
  syncMain(all, tables, options).then()
}
