import * as Sequelize from 'sequelize';
module.exports = (sequelize:Sequelize.Sequelize, DataTypes:Sequelize.DataTypes) => {
  const model = sequelize.define('t_absent',
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
      unique: 'uq_t_absent_02'
    },
    absent_code: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: 'uq_t_absent_02'
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
  },
  {
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓本プロジェクト必須↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // 設定をキャメルケースに変更
    underscored: true,
    // テーブル名を複数形にしないよう抑制
    freezeTableName: true,
    // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑本プロジェクト必須↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
  });
  model.associate = (models:Sequelize.Models) => {
    const m_absent = models.m_absent;
    const t_attendance = models.t_attendance;
    const t_absent = models.t_absent;
    t_absent
      .belongsTo(t_attendance, {foreignKey: 'attendance_no', targetKey: 'attendance_no'});
    t_absent
      .belongsTo(m_absent, {foreignKey: 'absent_code', targetKey: 'absent_code'});
  };
  return model;
};
