import * as Sequelize from 'sequelize'
import * as Bluebird from 'bluebird'
import * as fs from 'fs'
import { promisify } from 'util'
import { resolve as pathResolve } from 'path'
import { execQueryFile } from './../utils/sql_util'
module.exports = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) => {
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
  // syncメソッドをビュー用に上書き
  model.sync = (options?: Sequelize.SyncOptions) => {
    const viewPath = pathResolve(__dirname, './../../sql/view/create_alter_v_test.sql')
    return execQueryFile(viewPath)
      .then(() => {
        return this
      })
  }
  return model
}
