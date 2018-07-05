import * as Sequelize from 'sequelize'
const U_KEY_02 = 'uq_t_own_holiday_02'
module.exports = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) => {
  const model = sequelize.define(
    't_own_holiday',
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
        allowNull: false,
        unique: U_KEY_02
      },
      holiday_code: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: U_KEY_02
      },
      start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      end_date: {
        type: DataTypes.DATEONLY,
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
      // その他option
    }
  )
  // model.associate = (models: Sequelize.Models) => {
  // }
  return model
}
