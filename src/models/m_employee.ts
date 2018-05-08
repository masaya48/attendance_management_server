import * as Sequelize from 'sequelize';
module.exports = (sequelize:Sequelize.Sequelize, DataTypes:Sequelize.DataTypes) => {
  const model = sequelize.define('m_employee',
  {
    user_no: {
      type: DataTypes.INTEGER,
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
  },
  {
    // 設定をキャメルケースに変更
    underscored: true,
    // テーブル名を複数形にしないよう抑制
    freezeTableName: true
  });
  return model;
}