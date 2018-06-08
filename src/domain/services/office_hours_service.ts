// node_modules
import * as Bluebird from 'bluebird'
//
import {models, Sequelize} from './../../libs/models'
// dto
import RegistAtWorkRequestDTO from './../dto/request/office_hours/regist_at_work'
import RegistLeaveWorkRequestDTO from './../dto/request/office_hours/regist_leave_work'
import RegistAtWorkResponseDTO from './../dto/response/office_hours/regist_at_work'
// adapter
import ApplicationError from '../../libs/errors/application_error'
import { ErrorCode } from '../../utils/constants/error_code'

const Attendance = models.t_attendance
const Op = Sequelize.Op
const {ne} = Sequelize.Op

class OfficeHoursService {

  public checkAttendance(userNo: number): Bluebird<any> {
    return Attendance.find<number>({
      where: {
        user_no: userNo,
        attendance_no: {
          [Op.in]: [Sequelize.literal('SELECT MAX(attendance_no) FROM t_attendance WHERE end_time IS NULL GROUP BY user_no')]
        }
      }
    })
    .then(attendance => {
      const attendanceNo = attendance.attendance_no
      console.log(attendanceNo)
    })
    .catch(() => {
      console.log('error')
    })
  }

  public registAtWork(requestDTO: RegistAtWorkRequestDTO): Bluebird<RegistAtWorkResponseDTO> {
    const userNo = requestDTO.getUserNo()
    const attendanceTime = requestDTO.getAttendanceTime()
    return new Bluebird((resolve, reject) => {
      Attendance.create({
        user_no: userNo,
        working_date: attendanceTime,
        start_time: attendanceTime,
        create_user_no: userNo,
        update_user_no: userNo
      })
      .then(attendance => {
        return resolve(new RegistAtWorkResponseDTO(attendance.attendance_no))
      })
      .catch(() => {
        return reject(new ApplicationError(ErrorCode.ServerError))
      })
    })
  }

  public registLeaveWork(requestDTO: RegistLeaveWorkRequestDTO) {

    return new Bluebird((resolve, reject) => {
      
    })
  }
}
export default OfficeHoursService
