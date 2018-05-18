import * as fs from 'fs'
import * as path from 'path'
import * as Sequelize from 'sequelize'
import sequelize from './../dbconn'

const directory = path.join(__dirname, '..', '..', 'models')

// directoryの存在確認と作成
try {
  fs.lstatSync(directory)
} catch (e) {
  fs.mkdirSync(directory)
}
const models: Sequelize.Models = {}

// model定義読み込み
fs
  .readdirSync(directory)
  .filter(file => {
    return (file.indexOf('.') !== 0)/*&& (file !== basename)*/ && (file.slice(-3) === '.js')
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(directory, file))
    if (model) {
      models[model.name] = model
    }
  })

// associateの実行
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models)
  }
})

// sequelizeインスタンスの保存
// models['sequelize'] = sequelize
// models['Sequelize'] = Sequelize

export default models
export { models, sequelize, Sequelize }
