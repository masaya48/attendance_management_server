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

module.exports = (commander:Commander.Command) => {
  // syncコマンドのバージョン
  commander
    .version('0.0.0');
  // オプション定義
  commander
    .option('-A, --all', 'sync all tables')
    .option('-t, --tables <csv>', 'choose tables with csv', types.csv)
    .option('-f, --options-force <n>', 'sync option of force', /^(0|1)$/i, '0')
    .option('-a, --options-alter <n>', 'sync option of alter', /^(0|1)$/i, '1');
  // 使用するオプションにnodeのコマンドライン引数を指定
  commander
    .parse(process.argv);

  const options:Sequelize.SyncOptions = {};

  if (commander.optionsForce && commander.optionsForce === '1') {
    options.force = true;
  } else {
    options.force = false;
  }

  if (commander.optionsAlter && commander.optionsAlter === '1') {
    options.alter = true;
  } else {
    options.alter = false;
  }
  
  const sync_options = {
    all: commander.all,
    tables: commander.tables,
    options: options
  };

  return sync_options;
};