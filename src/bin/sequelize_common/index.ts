import * as Sequelize from 'sequelize';
import * as Config from 'config';
module.exports = () => {
  let obj = {
    sequelize:(config:Config.IConfig):Sequelize.Sequelize => {
      return require('../../libs/dbconn')(config);
    },
    models: (sequelize:Sequelize.Sequelize):Sequelize.Models => {
      return require('../../libs/models')(sequelize);
    },
    close: (sequelize:Sequelize.Sequelize) => {
      return sequelize.close()
        .then(() => {
          console.log('connection close.');
        });
    }
  };
};
