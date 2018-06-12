import * as Sequelize from 'sequelize'
import * as Bluebird from 'bluebird'
import * as fs from 'fs'
import { promisify } from 'util'
import { resolve as pathResolve } from 'path'
import { execQueryFile } from './../utils/sql_util'
module.exports = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) => {
  const model = sequelize.define(
    'v_exist_arrival',
    {
      attendance_no: {
        type: DataTypes.BIGINT,
        // id という名前以外で主キーが必要な場合必ず必要
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_no: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      count: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      // その他option
      timestamps: false
    }
  )
  // syncメソッドをビュー用に上書き
  model.sync = (options?: Sequelize.SyncOptions) => {
    const viewPath = pathResolve(__dirname, './../../sql/view/create_alter_v_exist_arrival.sql')
    return execQueryFile(viewPath)
      .then(() => {
        return this
      })
  }
  return model
}
