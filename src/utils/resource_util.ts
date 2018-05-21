import * as jsonUtil from './json_util'
import * as path from 'path'

/**
 * リソースデータを取得する
 * 
 * @param fileName リソースファイル名
 */
export const getResources = (fileName: string) => {
  const filePath = path.join(__dirname, '..', '..', 'resources', fileName)
  console.log(filePath)
  return jsonUtil.getJsonFileData<any>(filePath)
}
