# attendance-management:*Server*
<!--
  箇条書き「* 〜〜」のあとは一行空ける
-->
## **説明**
出退勤管理システムサーバー側実装

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
$ yarn
```
### *tsのビルドとwatch*
```sh
# ビルド
$ yarn build

# watch
$ yarn watch
```

### *サーバ起動*
```sh
# for windows
$ yarn start

# for mac
$ yarn start_mac
```

<br/>

## **DBの準備**
* MySql[version]をインストール
* 『attendance_management』の名称でDB作成

```sql
-- rootは任せます。
-- rootのユーザーでログインして、指定されたuser名とpasswordでユーザー作成と権限付与
-- DB作成
CREATE DATABASE attendance_management CHARACTER SET utf8;

-- ユーザー作成
CREATE USER user_name IDENTIFIED BY password;

-- 権限付与
GRANT ALL ON attendance_management.* TO user_name;
```

<br/>

## **DBマイグレーションの実行手順(変更の可能性あり？)**
* DBを準備、起動
* ソースをビルド
* 以下のコマンドを実行

### *基本コマンド*
```sh
# for windows
$ yarn sync

# for mac
$ yarn sync_mac
```

### *同期オプション(例はwindows)*
```sh
# help表示
$ yarn sync -h

# 全テーブルを同期
$ yarn sync -A

# 指定したテーブルのみ同期(カンマ「,」で複数指定可)
#   ※「-A」と同時に指定した場合は「-A」が優先
$ yarn sync -t <table_name>

# 同期オプション(考え中…)
# テーブルの「DROP & CREATE」もしくは「CREATE」の指定
$ yarn sync -f 1
# テーブルの「Alter」有無指定
$ yarn sync -a 1
```
<br/>

## **Install**

<br/>

## **Contribution**

<br/>

## **Licence**

<br/>

## **Author**
