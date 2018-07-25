import * as Sequelize from 'sequelize'
module.exports = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) => {
  const model = sequelize.define(
    'm_holiday_type',
    {
      holiday_type: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: ''
      }/*,
      addition_hours: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      addition_dates: {
        type: DataTypes.DECIMAL(2,1),
        allowNull: false
      }*/
    }, {
      // その他option
    }
  )
  // model.associate = (models: Sequelize.Models) => {
  // }
  return model
}
