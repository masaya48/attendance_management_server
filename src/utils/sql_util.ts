import { sequelize, Sequelize, models } from './../libs/models'
import { readFileSync } from './file_util'

export const getQuery = ( path: string ) => {
  return readFileSync( path )
}

export const execQueryFile = ( path ) => {
  return sequelize.query( getQuery( path ) )
}
