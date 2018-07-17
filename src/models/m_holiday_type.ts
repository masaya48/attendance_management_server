import * as Sequelize from 'sequelize'
module.exports = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) => {
  const model = sequelize.define(
    'm_holiday',
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
      },
      hours: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      days: {
        type: DataTypes.DECIMAL(2,1),
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
