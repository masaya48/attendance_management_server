import * as fs from 'fs'

export const existFile = (path: string): boolean => {
  try {
    fs.statSync(path)
    return true
  } catch (err) {
    return false
  }
}