import * as Sequelize from 'sequelize';
module.exports = (sequelize:Sequelize.Sequelize, DataTypes:Sequelize.DataTypes) => {
  return sequelize.define('t_attendance',
  {
    attendance_no: {
      type: DataTypes.BIGINT,
      // id という名前以外で主キーが必要な場合必ず必要
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_no: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    working_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_time: {
      type: DataTypes.DATE
    },
    rest_time: {
      type: DataTypes.TIME,
      defaultValue: '01:00:00'
    },
    remarks: {
      type: DataTypes.STRING(100)
    },
    additional_status: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    modified_start_time: {
      type: DataTypes.DATE
    },
    modified_end_time: {
      type: DataTypes.DATE
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
    // 設定をキャメルケースに変更
    underscored: true,
    // テーブル名を複数形にしないよう抑制
    freezeTableName: true/*,
    classMethods: {
      associate: (models:Sequelize.Models) => {
        console.log('t_attendance associate.');
      }
    }*/
  });
};
