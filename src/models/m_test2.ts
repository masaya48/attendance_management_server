import * as Sequelize from 'sequelize'
module.exports = (sequelize:Sequelize.Sequelize, DataTypes:Sequelize.DataTypes) => {
  const model = sequelize.define(
    'test2',
    {
      id: {
        type: DataTypes.BIGINT,
        // id という名前以外で主キーが必要な場合必ず必要
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      column3: {
        type: DataTypes.STRING(100)
      },
      column4: {
        type: DataTypes.STRING(100)
      }
    }, {
      // その他option
    }
  )
  return model
}
