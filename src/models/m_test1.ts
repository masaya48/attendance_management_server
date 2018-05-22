import * as Sequelize from 'sequelize'
module.exports = (sequelize:Sequelize.Sequelize, DataTypes:Sequelize.DataTypes) => {
  const model = sequelize.define(
    'test1',
    {
      id: {
        type: DataTypes.BIGINT,
        // id という名前以外で主キーが必要な場合必ず必要
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      column1: {
        type: DataTypes.STRING(100)
      },
      column2: {
        type: DataTypes.STRING(100)
      }
    }, {
      // その他option
    }
  )
  model.associate = (models:Sequelize.Models) => {
    const test1 = models.test1
    const test2 = models.test2
    test1
      .belongsTo(test2, {foreignKey: 'id', targetKey: 'id'})
  }
  return model
}
