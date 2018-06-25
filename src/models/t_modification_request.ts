import * as Sequelize from 'sequelize'
module.exports = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) => {
  const model = sequelize.define(
    't_modification_request',
    {
      request_no: {
        type: DataTypes.BIGINT,
        // id という名前以外で主キーが必要な場合必ず必要
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      request_user_no: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      subject: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: ''
      },
      reason: {
        type: DataTypes.STRING(4000),
        allowNull: false,
        defaultValue: ''
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
