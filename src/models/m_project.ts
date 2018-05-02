import * as Sequelize from 'sequelize';
module.exports = (sequelize:Sequelize.Sequelize, DataTypes:Sequelize.DataTypes) => {
  return sequelize.define('m_project',
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
  },
  {
    // 設定をキャメルケースに変更
    underscored: true,
    // テーブル名を複数形にしないよう抑制
    freezeTableName: true
  });
};