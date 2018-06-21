import * as Sequelize from 'sequelize'
module.exports = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) => {
  const model = sequelize.define(
    't_attendance_modification',
    {
      id: {
        type: DataTypes.BIGINT,
        // id という名前以外で主キーが必要な場合必ず必要
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      request_no: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      attendance_no: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      is_start_time: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      modified_time: {
        type: DataTypes.DATE
      },
      create_user_no: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      update_user_no: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      // その他option
    }
  )
  model.associate = (models: Sequelize.Models) => {
  }
  return model
}
