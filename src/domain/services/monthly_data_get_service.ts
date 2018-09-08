// node_modules
import * as Bluebird from 'bluebird'
import * as Sequelize from 'sequelize'
// config
import config from './../../libs/config'
// error
import ApplicationError from './../../libs/errors/application_error'
// dto
import BaseResponseDTO from './../dto/response/base_response_dto'
import MonthlyDataGetRequestDTO from './../dto/request/monthly_data_get_request'
import MonthlyDataGetResponseDTO from './../dto/response/monthly_data_get_response'
// DB
import models from './../../libs/models'
import Employee from 'm_employee'
import Attendance from 't_attendance'
import ErrorCode from './../../utils/constants/error_code'
import * as moment from './../../libs/moment'
import * as excel from 'exceljs'

class MonthlyDataGetService {
  public getMonthlyData(requestDTO: MonthlyDataGetRequestDTO): Bluebird<MonthlyDataGetResponseDTO> {
    return new Bluebird((resolve, reject) => {
      const Op = Sequelize.Op
      const Attendance = models.t_attendance
      const reqMonth = requestDTO.getAttendanceMonth()
      const beginMonth = moment(reqMonth.getFullYear() + '-' + (reqMonth.getMonth() + 1) + '-' + '01').toDate()
      const endMonth = moment(reqMonth.getFullYear() + '-' + (reqMonth.getMonth() + 1 )+ '-' + '31').toDate()
      return Attendance.findAll({
        where: {
          user_no: requestDTO.getUserNo(),
          working_date: {[Op.between]: [beginMonth, endMonth]}
        }
      })
      .then(monthly_data => {
        if (!monthly_data) {
          reject(new ApplicationError(ErrorCode.AuthError))
          return
        }
        return resolve(new MonthlyDataGetResponseDTO(monthly_data))
      })
    })
  }

  public async getExcel(requestDTO: MonthlyDataGetRequestDTO): Promise<string> {
    const Op = Sequelize.Op
    const Attendance = models.t_attendance
    const reqMonth = requestDTO.getAttendanceMonth()
    const beginMonth = moment(reqMonth.getFullYear() + '-' + (reqMonth.getMonth() + 1) + '-' + '01').toDate()
    const endMonth = moment(reqMonth.getFullYear() + '-' + (reqMonth.getMonth() + 1 )+ '-' + '31').toDate()
    const templateFilePath = "/Users/imorikeinin/workspace_a/va10_0426/attendance_management_server/templates/excel/emp.xlsx"
    const outputFileName = "/Users/imorikeinin/workspace_a/va10_0426/attendance_management_server/templates/test/out.xlsx"
    await Attendance.findAll({
      where: {
        user_no: requestDTO.getUserNo(),
        working_date: {[Op.between]: [beginMonth, endMonth]}
      }
    }).then(async attend => {
      const openCellNo = 4
      // for(let i=0; i < attend.length; i++){
        const workbook = new excel.Workbook()
        let zero = ''
        await workbook.xlsx.readFile(templateFilePath).then(async function () {
        const sheet1 = await workbook.getWorksheet(1)
        for(let i=0; i < attend.length; i++){
            if (attend[i].start_time.getMinutes() < 10){
              zero = '0'
            }
            sheet1.getCell(openCellNo + attend[i].start_time.getDate(), 4).value = attend[i].start_time.getHours() + ':' + zero + attend[i].start_time.getMinutes()
            zero = ''
            if (attend[i].end_time.getMinutes() < 10){
              zero = '0'
            }
            sheet1.getCell(openCellNo + attend[i].end_time.getDate(), 5).value = attend[i].end_time.getHours() + ':' + zero + attend[i].end_time.getMinutes()
            zero = ''
          }       
          sheet1.getCell(2,3).value = attend[0].start_time.getMonth() + 1
          // sheet1.getCell(1,2).value = attend[0].user_no
          await workbook.xlsx.writeFile(outputFileName).then(function() {
              console.log("write ok!")
          })
        })
      // }
    })
    
    return outputFileName
  }
}
export default new MonthlyDataGetService()
