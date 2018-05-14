import * as Sequelize from 'sequelize';
module.exports = (sequelize:Sequelize.Sequelize, DataTypes:Sequelize.DataTypes) => {
  const model = sequelize.define(
    'm_absent_type',
    {
      absent_type: {
        type: DataTypes.INTEGER,
        // id という名前以外で主キーが必要な場合必ず必要
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      absent_name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
      }
    }, {
      // その他option
    }
  );
  return model;
};
