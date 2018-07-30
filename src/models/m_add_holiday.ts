import * as Sequelize from 'sequelize'
module.exports = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) => {
  const model = sequelize.define(
    'm_add_holiday',
    {
      add_holiday_code: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false
      },
      holiday_calc_type: {
        type: DataTypes.BIGINT,
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
