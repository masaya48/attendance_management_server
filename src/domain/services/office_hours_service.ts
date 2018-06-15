// node_modules
import * as Bluebird from 'bluebird'
//
import {models, Sequelize, sequelize} from './../../libs/models'
// dto
// import RegistLeaveWorkRequestDTO from './../dto/request/office_hours/regist_leave_work'
// import RegistAtWorkResponseDTO from './../dto/response/office_hours/regist_at_work'
import * as OfficeHoursRequest from '../dto/request/office_hours_request'
import * as OfficeHoursResponse from '../dto/response/office_hours_response'
// import CheckAttendanceResponseDTO from './../dto/response/office_hours/check_attendance'
// adapter
import ApplicationError from '../../libs/errors/application_error'
import { ErrorCode } from '../../utils/constants/error_code'

const Attendance = models.t_attendance
const ExistArrival = models.v_exist_arrival

class OfficeHoursService {

  public checkAttendance(userNo: number): Bluebird<OfficeHoursResponse.CheckAttendanceResponseDTO> {
    console.log('test')
    return new Bluebird((resolve, reject) => {
      ExistArrival.find({
        where: {
          user_no: userNo
        }
      })
      .then(existArrival => {
        if (!existArrival) {
          return resolve(new OfficeHoursResponse.CheckAttendanceResponseDTO(0, false))
        }
        const attendanceNo = existArrival.attendance_no
        return resolve(new OfficeHoursResponse.CheckAttendanceResponseDTO(attendanceNo, true))
      })
      .catch(e => {
        console.log(e)
        return reject(new ApplicationError(ErrorCode.ServerError))
      })
    })
  }
  private a(): number {
    return 0
  }
  public readonly regist = {
    a: this.a
  }
  public registAtWork(requestDTO: OfficeHoursRequest.Regist.AtWorkRequestDTO): Bluebird<OfficeHoursResponse.Regist.AtWorkResponseDTO> {
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
        return resolve(new OfficeHoursResponse.Regist.AtWorkResponseDTO(attendance.attendance_no))
      })
      .catch(() => {
        return reject(new ApplicationError(ErrorCode.ServerError))
      })
    })
  }

  public registLeaveWork(requestDTO: OfficeHoursRequest.Regist.LeaveWorkRequestDTO) {

    return new Bluebird((resolve, reject) => {
      
    })
  }
}
export default OfficeHoursService
