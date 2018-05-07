import * as Sequelize from 'sequelize';
module.exports = (sequelize:Sequelize.Sequelize, DataTypes:Sequelize.DataTypes) => {
  const model = sequelize.define('table_sample',
  {
    sample_no: {
      type: DataTypes.INTEGER,
      // id という名前以外で主キーが必要な場合必ず必要
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    sapmle_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sample_string: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'default'
    },
    sample_datetime: {
      // yyyy-mm-dd hh:mm:ss
      type: DataTypes.DATE
    },
    sample_date: {
      // yyyy-mm-dd
      type: DataTypes.DATEONLY
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
  // model.associate = (models:Sequelize.Models) => {
    // 外部キーの定義・その他
  // };
  return model;
};
