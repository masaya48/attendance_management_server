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
* MySql[]をインストール
* 『attendance_management』の名称でDB作成

### *mysqlサーバー起動とシェル起動*
```sh
# mysqlサーバー起動
$ mysql.server start

# mysqlサーバー終了
$ mysql.server stop

# mysqlシェル起動(passwordない場合)
$ mysql -u user_name

# mysqlシェル起動(passwordある場合)
$ mysql -u user_name -p
Enter password: *******
```

### *初期準備(DB・USERの作成と権限付与)*
```sql
-- rootは任せます。
-- rootのユーザーでシェルを起動して、指定されたuser名とpasswordでユーザー作成と権限付与
-- DB作成
mysql> CREATE DATABASE attendance_management CHARACTER SET utf8;

-- ユーザー作成
-- user_name:本プロジェクトで使用するUSER
-- password:本プロジェクトで使用するpassword
-- config/[NODE_ENV].jsonに同様のUSER、passwordを設定すること
mysql> CREATE USER user_name IDENTIFIED BY 'password';

-- 権限付与
mysql> GRANT ALL ON attendance_management.* TO user_name;

-- シェルの終了
mysql> quit

-- 権限付与の確認
--   作成したユーザーでシェルを起動し直し、以下のコマンドを実行してエラーでなければオケ
mysql> USE attendance_management;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
```

<br/>

## **DBマイグレーションの実行手順**
* DBを準備、起動
* ソースをビルド
* 以下のコマンドを実行(src/models配下に作成したテーブル定義に従って作成される)

### *テーブル定義の同期*
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

# 同期オプション
# テーブルの「DROP & CREATE」の有効化
$ yarn sync -f 1

# テーブルの「Alter」有無指定
$ yarn sync -a 1
```

### *初期データ投入*
```sh
# for windows
$ yarn seed

# for mac
$ yarn seed_mac
```

### *投入オプション(例はwindows)*
```sh
# help表示
$ yarn seed -h

# データのある全テーブルを投入
$ yarn seed -A

# 指定したテーブルのデータのみ投入(カンマ「,」で複数指定可)
#   ※「-A」と同時に指定した場合は「-A」が優先
$ yarn seed -t <table_name>

# 今あるデータを上書き(updateなければ新規追加(insert)
$ yarn seed -u

# 今あるデータを削除して再投入(TRANCATE文実行による再作成)
$ yarn seed -d
```

<br/>

## **Install**

<br/>

## **Contribution**

<br/>

## **Licence**

<br/>

## **Author**
