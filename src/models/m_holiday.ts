import * as Sequelize from 'sequelize'
module.exports = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) => {
  const model = sequelize.define(
    'm_holiday',
    {
      holiday_code: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false
      },
      holiday_calc_type: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: ''
      },
      addition_hours: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      addition_dates: {
        type: DataTypes.DECIMAL(2, 1),
        allowNull: false,
        defaultValue: 0
      }
    }, {
      // その他option
    }
  )
  // model.associate = (models: Sequelize.Models) => {
  // }
  return model
}
