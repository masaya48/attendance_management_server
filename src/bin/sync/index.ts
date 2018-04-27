import * as commander from 'commander';
import * as Sequelize from 'sequelize';
import * as config from 'config';
import * as BlueBird from 'bluebird';

// ================================================================
// コマンドラインオプション設定・取得
// ================================================================
const command_option = require('./command_option')(commander);

const all:boolean = command_option.all;
const tables:string[] = command_option.tables;
const options:Sequelize.SyncOptions = command_option.options;

// console.log('options: ' + JSON.stringify(command_option));

// ================================================================
// 同期主処理
// ================================================================
const main:BlueBird<any> = require('./sync_main')(all,tables,options);
main.then();
