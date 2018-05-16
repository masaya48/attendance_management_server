import * as Sequelize from 'sequelize'
import * as Config from 'config'
import * as Bluebird from 'bluebird'
// const Connection = require('../connection')
import dbconn from './../../libs/dbconn'
import getModels from './../../libs/models'
import getSeeds from './../../libs/seeds'

export default function seedMain(all:boolean, tables:string[], update:boolean, destroy:boolean):Bluebird<any> {
  const sequelize:Sequelize.Sequelize = dbconn
  const models:Sequelize.Models = getModels(sequelize)
  const seeds = getSeeds()

  const done = () => {
    return () => {
      console.log('seed success!')
    }
  }
  const dberr = () => {
    return (e:Error) => {
      console.log('seed faild!')
    }
  }
  if (all || !tables || tables.length === 0) {
    return Bluebird
      .resolve()
      .then(() => {
        // seedの前処理
        return sequelize
          .query('SET FOREIGN_KEY_CHECKS = 0')
      })
      .then(() => {
        // seedの主処理
        return Bluebird.all(Object.keys(seeds).map(seedName => {
          const model = models[seedName]
          const seed:any[] = seeds[seedName]
          if (model && seed) {
            return Bluebird
              .resolve()
              .then(() => {
                if (destroy) {
                  console.log('destroy')
                  return model
                    .destroy({
                      truncate: true
                    })
                } else {
                  console.log('model not destroyed.')
                }
              })
              .then(() => {
                if (update) {
                  return Bluebird.all(seed.map(s => {
                    return model
                      .upsert(s)
                  }))
                } else {
                  return model
                    .bulkCreate(seed)
                }
              })
          } else {
            console.log('seed ' + seedName + ' is not found.')
          }
        }))
      })
      .then(done())
      .finally(() => {
        // seedの後処理
        return sequelize
          .query('SET FOREIGN_KEY_CHECKS = 1;')
          .finally(() => {
            return sequelize.close()
          })
      })
  } else if (tables && tables.length > 0) {
    return Bluebird
      .resolve()
      .then(() => {
        // seedの前処理
        return sequelize
          .query('SET FOREIGN_KEY_CHECKS = 0;')
      })
      .then(() => {
        // seedの主処理
        return Bluebird.all(tables.map((tableName) => {
          const model = models[tableName]
          const seed = seeds[tableName]
          if (model && seed) {
            return Bluebird
              .resolve()
              .then(() => {
                if (destroy) {
                  return model
                    .truncate()
                } else {
                  console.log('model not destroyed.')
                }
              })
              .then(() => {
                if (update) {
                  return Bluebird.all(seed.map(s => {
                    return model
                      .upsert(s)
                  }))
                } else {
                  return model
                    .bulkCreate(seed)
                }
              })
          } else {
            console.log('seed ' + tableName + ' is not found.')
          }
        }))
      })
      .then(done())
      .finally(() => {
        // seedの後処理
        return sequelize
          .query('SET FOREIGN_KEY_CHECKS = 1;')
          .finally(() => {
            return sequelize.close()
          })
      })
      .error(dberr())
  }
}
