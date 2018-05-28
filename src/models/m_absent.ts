import * as Sequelize from 'sequelize'
module.exports = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) => {
  const model = sequelize.define(
    'm_absent',
    {
      absent_code: {
        type: DataTypes.BIGINT,
        // id という名前以外で主キーが必要な場合必ず必要
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      absent_type: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      reason: {
        type: DataTypes.STRING(100)
      }
    }, {
      // その他option
    }
  )
  model.associate = (models: Sequelize.Models) => {
    const m_absent_type = models.m_absent_type
    const m_absent = models.m_absent
    m_absent
      .belongsTo(m_absent_type, {foreignKey: 'absent_type', targetKey: 'absent_type'})
  }
  return model
}
