// node_modules
import * as Bluebird from 'bluebird'

// config
import config from './../../libs/config'
// error
import ApplicationError from './../../libs/errors/application_error'
// dto
import BaseResponseDTO from './../dto/response/base_response_dto'
import MonthlyDataGetRequestDTO from './../dto/request/monthly_data/monthly_data_get_request'
import MonthlyDataGetResponseDTO from './../dto/response/monthly_data/monthly_data_get_response'
// DB
import models from './../../libs/models'
import Employee from 'm_employee'
import Attendance from 't_attendance'
import ErrorCode from './../../utils/constants/error_code'

class MonthlyDataGetService {
  public getMonthlyData(requestDTO: MonthlyDataGetRequestDTO): Bluebird<MonthlyDataGetResponseDTO> {
    return new Bluebird((resolve, reject) => {
      const Attendance = models.t_attendance as Attendance.Model
      const reqMonth = requestDTO.getAttendanceMonth()
      return Attendance.findAll({
        where: {
          user_no: requestDTO.getUserNo(),
          working_date: reqMonth
        }
      })
      .then(monthly_data => {
        if (!monthly_data) {
          reject(new ApplicationError(ErrorCode.AuthError))
          return
        }
        //const {employee_no, user_no} = monthly_data
        //let token:string = jwt.sign({employee_no, user_no}, config.jwt.authentication_secret_key, {algorithm: config.jwt.algorithm})
        //employee.token = token
        const t = new MonthlyDataGetResponseDTO(monthly_data)
        return resolve(new MonthlyDataGetResponseDTO(monthly_data))
      })
    })
  }

  // よくわかりゃん…
}
export default MonthlyDataGetService
