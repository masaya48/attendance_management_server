import * as jsonUtil from './json_util'
import * as path from 'path'

export const getResources = (fileName: string) => {
  const filePath = path.join(__dirname, '..', '..', 'resources', fileName)
  console.log(filePath)
  return jsonUtil.getJsonFileData<any>(filePath)
}

console.log(getResources('message.json')['errors.server'])
console.log(getResources('*.json'))
console.log(getResources('aaaaa.json'))
