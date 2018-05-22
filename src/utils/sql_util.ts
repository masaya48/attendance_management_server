import {sequelize, Sequelize, models} from './../libs/models'
import * as Bluebird from 'bluebird'
import {promisify} from 'bluebird'
import * as fs from 'fs'
import {resolve as pathResolve} from 'path'

const model = models.a
model.sync = (options?: Sequelize.SyncOptions) => {
  const viewPath = pathResolve(__dirname, './../../sql/create_v_test.sql')
  return Bluebird
    .resolve()
    .then(() => {
      const readFile = promisify(fs.readFile) as any
      return readFile(viewPath, { encoding: 'utf8' }) as string
    })
    .then(viewSource => {
      sequelize.query(viewSource, {
        logging: options.logging
      })
      return this
    })
}
