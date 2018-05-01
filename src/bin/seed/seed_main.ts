import * as Sequelize from 'sequelize';
import * as Config from 'config';
import * as Bluebird from 'bluebird';

const sequelize:Sequelize.Sequelize = require('../../libs/dbconn')(Config);
const models:Sequelize.Models = require('../../libs/models')(sequelize);
const seeds = require('../../libs/seeds')();
module.exports = (all:boolean, tables:string[]) => {
  if (all || !tables || tables.length === 0) {
    return Bluebird
      .resolve()
      .then(() => {
        return Bluebird.all(Object.keys(seeds).map(seedName => {
          const model = models[seedName];
          const seed = seeds[seedName];
          if (model && seed) {
            return model
              .bulkCreate(seed)
          } else {
            console.log('seed ' + seedName + ' is not found.')
          }
        }))
      })
      .finally(() => {
        return sequelize.close()
      });
  } else if (tables && tables.length > 0) {
    return Bluebird.resolve().then(() => {
      console.log('not created!')
    })
  }
  // console.log('seeds: ' +JSON.stringify(seeds['m_employee']));

  // console.log('test seed');
  // const emp = models['m_employee'];
  // emp.findAll()
  // .then((emps) => {
  //   emps.forEach(e => {
  //     console.log(e);
  //   });
  //   if (emps.length === 0) {
  //     console.log('not find');
  //   }
  // })
  // .then(() => {
  //   const data = require('../../seeds/m_emplyee');
  //   emp.bulkCreate(data.seeds)
  //   .then(() => {
  //     return emp.findAll();
  //   })
  //   .then(a => {
  //     console.log(a);
  //   })
  //   .finally(() => {
  //     sequelize.close();
  //   })
  //   .error((e) => {
  //     console.log(e);
  //   });
  // });
};
