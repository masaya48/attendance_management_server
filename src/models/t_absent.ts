import * as Sequelize from 'sequelize'
const U_KEY_02 = 'uq_t_absent_02'
module.exports = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) => {
  const model = sequelize.define(
    't_absent',
    {
      reason_no: {
        type: DataTypes.BIGINT,
        // id という名前以外で主キーが必要な場合必ず必要
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      attendance_no: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: U_KEY_02
      },
      absent_code: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: U_KEY_02
      },
      reason: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
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
    const m_absent = models.m_absent
    const t_attendance = models.t_attendance
    const t_absent = models.t_absent
    t_absent
      .belongsTo(t_attendance, {foreignKey: 'attendance_no', targetKey: 'attendance_no'})
    t_absent
      .belongsTo(m_absent, {foreignKey: 'absent_code', targetKey: 'absent_code'})
  }
  return model
}
