import * as fs from 'fs';
import * as path from 'path';
import * as Sequelize from 'sequelize';
module.exports = (sequelize:Sequelize.Sequelize) => {
  // const basename = path.basename(__filename);
  const directory = path.join(__dirname, '..', '..', 'models');
  try {
    fs.lstatSync(directory);
  } catch (e) {
    fs.mkdirSync(directory);
  }
  let db = {};

  fs
    .readdirSync(directory)
    .filter(file => {
      return (file.indexOf('.') !== 0)/*&& (file !== basename)*/ && (file.slice(-3) === '.js');
    })
    .forEach(file => {
      var model = sequelize['import'](path.join(directory, file));
      db[model.name] = model;
    });

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db['sequelize'] = sequelize;
  db['Sequelize'] = Sequelize;
  
  return db;
}