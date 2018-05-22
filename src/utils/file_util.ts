import * as fs from 'fs'

/**
 * ファイルの存在確認
 *
 * @param path 該当ファイルまでのパス
 */
export const existFile = (path: string): boolean => {
  try {
    fs.statSync(path)
    return true
  } catch (err) {
    return false
  }
}