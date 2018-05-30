import * as XLSX from 'xlsx'

const workBook = XLSX.readFile('./templates/excel/template_sample.xlsx', {
  bookDeps: false,
  bookFiles: false,
  bookProps: false,
  bookSheets: false,
  bookVBA: false,
  cellDates: false,
  cellFormula: true,
  cellHTML: true,
  cellNF: false,
  cellStyles: true,
  cellText: true,
  WTF: false,
  sheetStubs: false
})

const Sheet1 = workBook.Sheets.Sheet1

const cell: XLSX.CellObject = Sheet1.a

XLSX.writeFile(workBook, './templates/test/test.xlsx', {
  bookSST: false,
  bookType: 'xlsx',
  bookVBA: false,
  cellDates: false,
  cellStyles: true,
  compression: false,
  WTF: false
})
