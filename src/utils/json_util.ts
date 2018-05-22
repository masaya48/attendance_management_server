import * as fs from 'fs'
import * as fileUtil from './file_util'

export const getJsonFileData = <T>(path: string): T => {
  if (!fileUtil.existFileSync(path)) {
    return {} as T
  }
  const data = JSON.parse(fs.readFileSync(path, {encoding: 'utf8'}))
  return data as T
}
