# attendance-management:*Server*
<!--
  箇条書き「* 〜〜」のあとは一行空ける
-->
## **説明**
infordio用出退勤管理システムサーバー側実装

<br/>

## **依存関係**
バージョンどうしよう…
* node v8.11.1
* typescript
* express
* socketio(使用するか不明)
* sequelize
* mysql2
* config

<br/>

## **使用方法**
### *依存関係のインストール*
```sh
$ npm install
```
### *ソースのコンパイルとwatch*
```sh
$ npm run build
# or
$ npm run watch
```
### *サーバ起動*
```sh
# for windows
$ npm start

# for mac
$ npm run start_mac
```

<br/>

## **DBの準備**
* MySql[version]をインストール
* 『attendance_management』の名称でDB作成

```sql
-- rootは任せます。
-- 指定されたuser名とpasswordでユーザー作成と権限付与
-- DB作成
CREATE DATABASE attendance_management CHARACTER SET utf8;

-- ユーザー作成
CREATE USER user_name IDENTIFIED BY password;

-- 権限付与
GRANT ALL ON attendance_management.* TO user_name;
```
* DBマイグレーションの実行(下記参照)

<br/>

## **DBマイグレーションの実行手順(変更の可能性あり？)**
* ソースをビルドして以下のコマンドを実行

### *For Windows (PowerShell)*
```powerShell
# 全テーブルを同期
$ npm run sync
# テーブルを指定して同期
$ npm run sync -- -t table_name
```

### *For Mac*
```sh
# 全て再構築
$ npm run sync_mac
# テーブルを指定して再構築
$ npm run sync_mac -- -t table_name1,table_name2
```








* DBを準備、起動
* サーバを起動
* 以下のマイグレーション用のコマンドを実行

### *For Windows (PowerShell)*
```powershell
# 全て再構築
$ Invoke-RestMethod -Uri "localhost:3000/devel/sync" -Method POST

# テーブルを指定して再構築
$ Invoke-RestMethod -Uri "localhost:3000/devel/sync/employee" -Method POST

# データを保持したまま再構築
$ Invoke-RestMethod -Uri "localhost:3000/devel/sync/employee" -Method POST -BODY "force=0&alter=1"
```
### *For Mac*
```sh
# 全て再構築
$ curl -X POST 'localhost:3000/devel/sync'

# テーブルを指定して再構築
$ curl -X POST 'localhost:3000/devel/sync/employee'

# データを保持したまま再構築
$ curl -X POST 'localhost:3000/devel/sync/employee' -d 'force=0&alter=1'
```

<br/>

## **Install**

<br/>

## **Contribution**

<br/>

## **Licence**

<br/>

## **Author**
