import * as Sequelize from 'sequelize';
import * as Config from 'config';
import * as Bluebird from 'bluebird';
module.exports = class Connection {
  private sequelize:Sequelize.Sequelize;
  private models:Sequelize.Models;

  constructor(config:Config.IConfig) {
    this.sequelize = require('../libs/dbconn')(Config);
    this.models = require('../libs/models')(this.sequelize);
  }

  public getSequelize():Sequelize.Sequelize {
    return this.sequelize;
  }
  public getModels():Sequelize.Models {
    return this.models;
  }

  public closeConnection():Bluebird<void> {
    return this.sequelize
      .close()
      .then(() => {
        console.log('connection close!');
      })
      .error(
        (e:Error) => {
          console.log(e);
        }
      );
  }
};
