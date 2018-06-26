// node_modules
import * as Bluebird from 'bluebird'
//
import { models } from './../../libs/models'
// dto
import * as OfficeHoursRequest from '../dto/request/office_hours_request'
import * as OfficeHoursResponse from '../dto/response/office_hours_response'
// adapter
import ApplicationError from '../../libs/errors/application_error'
import { ErrorCode } from '../../utils/constants/error_code'

const Attendance = models.t_attendance
const ExistArrival = models.v_exist_arrival

class OfficeHoursService {

  public checkAttendance(userNo: number): Bluebird<OfficeHoursResponse.CheckAttendanceResponseDTO> {

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

  // public async a(requestDTO: OfficeHoursRequest.Regist.AtWorkRequestDTO): Promise<OfficeHoursResponse.Regist.AtWorkResponseDTO> {
  //   const userNo = requestDTO.getUserNo()
  //   const attendanceTime = requestDTO.getAttendanceTime().toDate()
  //   const existArrival = await ExistArrival.find({
  //     where: {
  //       user_no: userNo
  //     }
  //   })
  //   if (existArrival) {
  //     return Bluebird.reject(new ApplicationError(ErrorCode.RequestError))
  //   }
  //   const attendance = await Attendance.create({
  //     user_no: userNo,
  //     working_date: attendanceTime,
  //     start_time: attendanceTime,
  //     create_user_no: userNo,
  //     update_user_no: userNo
  //   })
  //   return Bluebird.resolve(new OfficeHoursResponse.Regist.AtWorkResponseDTO(attendance.attendance_no))
  // }

  public registAtWork(requestDTO: OfficeHoursRequest.Regist.AtWorkRequestDTO): Bluebird<OfficeHoursResponse.Regist.AtWorkResponseDTO> {
    const userNo = requestDTO.getUserNo()
    const attendanceTime = requestDTO.getAttendanceTime().toDate()
    return new Bluebird((resolve, reject) => {
      //  存在確認
      return ExistArrival.find({
          where: {
            user_no: userNo
          }
        })
        .then(existArrival => {
          if (existArrival) {
            // 出勤済み
            return reject(new ApplicationError(ErrorCode.RequestError))
          }

          // 新規レコード作成(出勤)
          return Attendance.create({
              user_no: userNo,
              working_date: attendanceTime,
              start_time: attendanceTime,
              create_user_no: userNo,
              update_user_no: userNo
            })
            .then(attendance => {
              return resolve(new OfficeHoursResponse.Regist.AtWorkResponseDTO(attendance.attendance_no))
            })
        })
        .catch(() => {
          return reject(new ApplicationError(ErrorCode.ServerError))
        })
    })
  }

  public async registLeaveWork(requestDTO: OfficeHoursRequest.Regist.LeaveWorkRequestDTO): Promise<OfficeHoursResponse.Regist.LeaveWorkResponseDTO> {
    const userNo = requestDTO.getUserNo()
    const leaveTime = requestDTO.getLeaveTime().toDate()

    // 出勤の確認
    const existAttendance = await ExistArrival.find({
      where: {
        user_no: userNo
      }
    })
    if (!existAttendance) {
      return Bluebird.reject(new ApplicationError(ErrorCode.NotFound))
    }

    // 退勤時間登録
    const attendanceNo = existAttendance.attendance_no
    const updateInfo = await Attendance.update({
        end_time: leaveTime
      }, {
        where: {
          attendance_no: attendanceNo
        }
      })
    const count = updateInfo[0]
    if (count > 0) {
      return Bluebird.resolve(new OfficeHoursResponse.Regist.LeaveWorkResponseDTO(attendanceNo))
    }

    return Bluebird.reject(new ApplicationError(ErrorCode.ServerError))
  }
}
export default new OfficeHoursService()
