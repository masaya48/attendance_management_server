import * as Sequelize from 'sequelize'
module.exports = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) => {
  const model = sequelize.define(
    't_request_route',
    {
      route_no: {
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
      order: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      confirm_user_no: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      is_confirmed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
