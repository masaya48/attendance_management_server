import * as Sequelize from 'sequelize'
module.exports = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) => {
  const model = sequelize.define(
    'm_employee',
    {
      user_no: {
        type: DataTypes.BIGINT,
        // id という名前以外で主キーが必要な場合必ず必要
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      employee_no: {
        type: DataTypes.STRING(4),
        unique: true,
        allowNull: false
      },
      employee_name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
      },
      password: {
        type: DataTypes.STRING
      },
      token: {
        type: DataTypes.STRING
      },
      entry_date: {
        type: DataTypes.DATE
      },
      birthday: {
        type: DataTypes.DATE
      }
    }, {
        // その他option
    }
  )
  return model
}
