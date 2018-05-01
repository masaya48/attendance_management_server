import * as Commander from 'commander';
import * as Sequelize from 'sequelize';
const types = {
  json: (value:string) => {
    console.log(value);
    return JSON.parse(value);
  },
  csv: (value:string) => {
    return value.split(',');
  },
  list: (value:string, list:Array<string>) => {
    list.push(value);
    return list;
  }
};

module.exports = (commander:Commander.CommanderStatic) => {
  // syncコマンドのバージョン
  commander
    .version('0.0.1');
  // オプション定義[sync]
  commander
    .command('sync [env]')
    .description('aaa')
    .option('-A, --all', 'sync all tables')
    .option('-t, --tables <csv>', 'choose tables with csv', types.csv)
    .option('-f, --options-force <n>', 'sync option of force', /^(0|1)$/i, '0')
    .option('-a, --options-alter <n>', 'sync option of alter', /^(0|1)$/i, '1')
    .action((env, options) => {
      const sync_options:Sequelize.SyncOptions = {};

      // forceの設定
      if (options.optionsForce && options.optionsForce === '1') {
        sync_options.force = true;
      } else {
        sync_options.force = false;
      }
      // alterの設定
      if (options.optionsAlter && options.optionsAlter === '1') {
        sync_options.alter = true;
      } else {
        sync_options.alter = false;
      }

      const args = {
        all: options.all,
        tables: options.tables,
        options: sync_options
      };
      console.log(JSON.stringify(args));

      // 同期処理実行
      require('../sync')(options.all, options.tables, sync_options);
    });

  // オプション定義[seed]
  commander
    .command('seed [env]')
    .description('seed')
    .option('-A, --all', 'all seeds insert')
    .option('-t, --tables <csv>', 'choose tables with csv', types.csv)
    .action((env, options) => {
      console.log('seed');
      require('../seed')(options.all, options.tables);
    });

  // 使用するオプションにnodeのコマンドライン引数を指定
  commander
    .parse(process.argv);

  // const options:Sequelize.SyncOptions = {};

  // if (commander.optionsForce && commander.optionsForce === '1') {
  //   options.force = true;
  // } else {
  //   options.force = false;
  // }

  // if (commander.optionsAlter && commander.optionsAlter === '1') {
  //   options.alter = true;
  // } else {
  //   options.alter = false;
  // }

  // const sync_options = {
  //   all: commander.all,
  //   tables: commander.tables,
  //   options: options
  // };

  // return sync_options;
};