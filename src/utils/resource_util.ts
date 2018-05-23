import * as jsonUtil from './json_util'
import * as path from 'path'

/**
 * リソースからjsonデータを取得する
 *
 * @param fileName リソースファイル名
 */
export const getResourceData = (fileName: string) => {
  const filePath = path.join(__dirname, '..', '..', 'resources', fileName)
  return jsonUtil.getJsonFileData<any>(filePath)
}
