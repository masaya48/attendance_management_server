import * as Sequelize from 'sequelize'
module.exports = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) => {
  const model = sequelize.define(
    't_working_time',
    {
      working_no: {
        type: DataTypes.BIGINT,
        // id という名前以外で主キーが必要な場合必ず必要
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      attendance_no: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      project_code: {
        type: DataTypes.BIGINT,
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
  model.associate = (models: Sequelize.Models) => {
    const t_attendance = models.t_attendance
    const m_project = models.m_project
    const t_working_time = models.t_working_time
    t_working_time
      .belongsTo(t_attendance, {foreignKey:'attendance_no', targetKey: 'attendance_no'})
    t_working_time
      .belongsTo(m_project, {foreignKey: 'prodject_code'})
  }
  return model
}
