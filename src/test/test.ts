import * as exceljs from 'exceljs'
import * as fs from 'fs'
import * as path from 'path'

const book = new exceljs.Workbook()
const test = async (pathIn: string, pathOut: string) => {
    await book.xlsx.readFile(pathIn)
    await book.xlsx.writeFile(pathOut)
    console.log('finished!')
}

const pathIn = path.join(__dirname, '..', '..', 'templates', 'excel', 'template_sample.xlsx')
const pathOut = path.join(__dirname, '..', '..', 'templates', 'test', 'test.xlsx')
test(pathIn, pathOut)

