import * as fs from 'fs'
import * as Bluebird from 'bluebird'

/**
 * ファイルの存在確認
 *
 * @param path 該当ファイルまでのパス
 */
export const existFileSync = (path: string): boolean => {
  try {
    fs.statSync(path)
    return true
  } catch (err) {
    return false
  }
}

// export const existFile = (path: string) => {
// }
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
 * stringでファイル情報を取得する
 *   ※非同期処理用
 *
 * @param path ファイルパス
 * @param encoding ファイルエンコード:基本指定しない
 */
export const readFile = (path: string, encoding: string = 'utf8'): Bluebird<string> => {
  const readFile = Bluebird.promisify(fs.readFile) as any
  return new Bluebird((resolve, reject) => {
    if (!existFileSync(path)) {
      return reject(new Error('File not found.'))
    }
    return resolve(readFileSync(path, encoding))
//    return readFile(path, { encoding: encoding}) as string
  })
}
