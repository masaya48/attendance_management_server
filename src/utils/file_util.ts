import * as fs from 'fs'
import {promisify} from 'util'

/**
 * ファイルの存在確認
 *   ※同期処理用
 *
 * @param path ファイルパス
 */
export const existFileSync = (path: string): boolean => {
  try {
    fs.statSync(path)
    return true
  } catch (err) {
    return false
  }
}

/**
 * stringでファイル情報を取得する
 *   ※同期処理用
 *
 * @param path ファイルパス
 * @param encoding ファイルエンコード:基本指定しない
 */
export const readFileSync = (path: string, encoding: string = 'utf8'): string => {
  if (!existFileSync(path)) {
    return ''
  }
  return fs.readFileSync(path, {encoding: encoding})
}

/**
 * ファイルの存在確認
 *   ※非同期処理用
 *
 * @param path ファイルパス
 */
export const existFile = (path: string) => {
  const stat = promisify(fs.stat)
  return stat(path)
    .then(() => { return true })
    .catch(() => { return false })
}

/**
 * stringでファイル情報を取得する
 *   ※非同期処理用
 *
 * @param path ファイルパス
 * @param encoding ファイルエンコード:基本指定しない
 */
export const readFile = (path: string, encoding: string = 'utf8'): Promise<string> => {
  const readFile = promisify(fs.readFile)
  return existFile(path)
  .then(exist => {
    if (!exist) {
      return ''
    }
    return readFile(path, {encoding:encoding})
  })
}
