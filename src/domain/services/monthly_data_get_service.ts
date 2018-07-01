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
import * as moment from 'moment';

class MonthlyDataGetService {
  public getMonthlyData(requestDTO: MonthlyDataGetRequestDTO): Bluebird<MonthlyDataGetResponseDTO> {
    return new Bluebird((resolve, reject) => {
      const Op = Sequelize.Op
      const Attendance = models.t_attendance as Attendance.Model
      const reqMonth = requestDTO.getAttendanceMonth()
      // const beginMonth = reqMonth.getFullYear() + '-' + (reqMonth.getMonth() + 1) + '-' + '01'
      // const endMonth = reqMonth.getFullYear() + '-' + (reqMonth.getMonth() + 1 )+ '-' + '31'
      return Attendance.findAll({
        where: {
          user_no: requestDTO.getUserNo(),
          working_date: {[Op.between]: ['2018-07-01', '2018-07-31']}
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

}
export default new MonthlyDataGetService()
