import * as Commander from 'commander';
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
    .option('-a, --all', 'sync all tables')
    .option('-t, --tables <csv>', 'choose tables with csv', types.csv)
    .option('-o, --optional [json]', 'sync option of sequelize', types.json, {force:true});
  // 使用するオプションにnodeのコマンドライン引数を指定
  commander
    .parse(process.argv);
//  return commander;
}