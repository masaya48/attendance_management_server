import * as Sequelize from 'sequelize'
module.exports = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) => {
  const model =  sequelize.define(
    'm_project',
    {
      project_code: {
        type:DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
      },
      entry_no: {
        type: DataTypes.CHAR(8),
        unique: true,
        allowNull: false
      },
      project_name: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      project_short_name: {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
      // その他option
    }
  )
  return model
}
