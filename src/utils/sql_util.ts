import {sequelize, Sequelize, models} from './../libs/models'
import * as Bluebird from 'bluebird'
import {promisify} from 'bluebird'
import * as fs from 'fs'
import {resolve as pathResolve} from 'path'

import { readFile, readFileSync } from './file_util'

export const getQuery = (path: string) => {
  return readFileSync(path)
}

export const execQueryFile = (path) => {
  return sequelize.query(getQuery(path))
}

