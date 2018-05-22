import * as Sequelize from 'sequelize'
import * as Bluebird from 'bluebird'
import * as fs from 'fs'
import { promisify } from 'bluebird'
import { resolve as pathResolve } from 'path'
module.exports = (sequelize:Sequelize.Sequelize, DataTypes:Sequelize.DataTypes) => {
  const model = sequelize.define(
    'v_test',
    {
      id: {
        type: DataTypes.BIGINT,
        // id という名前以外で主キーが必要な場合必ず必要
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      column1: {
        type: DataTypes.STRING(100)
      },
      column2: {
        type: DataTypes.STRING(100)
      },
      column3: {
        type: DataTypes.STRING(100)
      },
      column4: {
        type: DataTypes.STRING(100)
      }
    }, {
      // その他option
    }
  )
  model.sync = (options?: Sequelize.SyncOptions) => {
    const viewPath = pathResolve(__dirname, './../../sql/view/create_v_test.sql')
    return Bluebird
      .resolve()
      .then(() => {
        const a = promisify(fs.readFile) as any
        return a(viewPath, { encoding: 'utf8' }) as string
      })
      .then(viewSource => {
        sequelize.query(viewSource, {
          logging: options.logging
        })
        return this
      })
  }
  return model
}
