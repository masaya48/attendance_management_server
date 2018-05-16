// node_modules
import * as Sequelize from 'sequelize'
import * as Config from 'config'
import * as Bluebird from 'bluebird'

// libs
import sequelize from './../../libs/dbconn'
import models from './../../libs/models'

/**
 * 同期主処理
 *
 * @param all
 * @param tables
 * @param options
 */
const sync = (all:boolean, tables:string[], options:Sequelize.SyncOptions):Bluebird<any> => {

  const done = () => {
    return () => {
      console.log('sync success!')
    }
  }
  const dberr = (msg:string) => {
    return (e:Error) => {
      console.log(msg)
    }
  }
  const connectionClose = () => {
    return sequelize
      .close()
      .then(() => {
        console.log('connection close.')
      })
      .error(dberr('close faild.'))
  }

  if (all == true || !tables || tables.length === 0) {
    // 全テーブル同期
    return new Bluebird(() => {
      // 同期[sequelize.sync()]の前処理
      sequelize.beforeBulkSync(() => {
        return sequelize
          .query('SET FOREIGN_KEY_CHECKS = 0;')
      })
      // 同期[sequelize.sync()]の後処理
      sequelize.afterBulkSync(() => {
        return sequelize
          .query('SET FOREIGN_KEY_CHECKS = 1;')
          .finally(() => {
            return connectionClose()
          })
      })
      // 同期の主処理
      return sequelize
        .sync(options)
        .then(done())
        .error(dberr('sync faild.'))
    })
  } else if (tables && tables.length > 0) {
    // 指定されたテーブルを同期
    return Bluebird
      .resolve()
      .then(() => {
        // 同期の前処理
        return sequelize
          .query('SET FOREIGN_KEY_CHECKS = 0;')
      })
      .then(() => {
        // 同期の主処理
        return Bluebird.all(tables.map((table) => {
          const model = models[table];
          if (model) {
            return model
              .sync(options)
          } else {
            console.log('table ' + table + ' is not found.')
          }
        }))
      })
      .then(done())
      .finally(() => {
        // 同期の後処理
        return sequelize
          .query('SET FOREIGN_KEY_CHECKS = 1;')
          .finally(() => {
            return connectionClose()
          })
      })
      .error(dberr('sync faild.'))
    }
  return new Bluebird(() => {
    console.log('sync no tables.')
  })
}
export default sync
