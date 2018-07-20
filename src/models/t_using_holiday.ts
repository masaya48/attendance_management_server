import * as Sequelize from 'sequelize'
module.exports = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) => {
  const model = sequelize.define(
    't_using_holiday',
    {
      id: {
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
      holiday_code: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      using_date: {
        type: DataTypes.DATE,
        allowNull: false
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
    }
  )
  // model.associate = (models: Sequelize.Models) => {
  // }
  return model
}
