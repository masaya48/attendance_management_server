// node_modules
import * as Bluebird from 'bluebird'
//
import models from './../../libs/models'
// dto
import RegistAtWorkDTO from './../dto/request/office_hours/regist_at_work'
// adapter
import ApplicationError from '../../libs/errors/application_error'
import { ErrorCode } from '../../utils/constants/error_code'

class OfficeHoursService {

  public atWork(requestDTO: RegistAtWorkDTO) {
    const Attendance = models.t_attendance
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
      .then(() => {
        return resolve()
      })
      .catch(() => {
        return reject(new ApplicationError(ErrorCode.ServerError))
      })
    })
  }
  public leaveWork() {

  }
}
export default OfficeHoursService
