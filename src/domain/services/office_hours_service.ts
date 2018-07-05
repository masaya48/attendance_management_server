// node_modules
import * as Bluebird from 'bluebird'
import moment from './../../libs/moment'
//
import { models, Sequelize } from './../../libs/models'
// dto
import * as OfficeHoursRequest from '../dto/request/office_hours_request'
import * as OfficeHoursResponse from '../dto/response/office_hours_response'
// adapter
import ApplicationError from '../../libs/errors/application_error'
import { ErrorCode } from '../../utils/constants/error_code'

const Attendance = models.t_attendance
const Op = Sequelize.Op

/**
 * 出退勤用サービスクラス
 */
class OfficeHoursService {

  /** 出勤確認 */
  public async checkAttendance(userNo: number): Promise<OfficeHoursResponse.CheckAttendanceResponseDTO> {
    // 出勤有無
    let isAttendance = false
    // 出退勤情報を取得
    let attendance = await this.existsAttendance(userNo)
    if (attendance) {
      // 出勤情報がある場合
      isAttendance = true
    } else {
      // 出勤情報がない場合当日の最新の情報を取得
      attendance = await this.getTodaysRecentlyAttendance(userNo)
      isAttendance = false
    }

    if (!attendance) {
      // 該当データがなかった場合
      return new OfficeHoursResponse.CheckAttendanceResponseDTO(0, null, null, false)
    }
    // あった場合
    return new OfficeHoursResponse.CheckAttendanceResponseDTO(attendance.attendance_no, attendance.start_time, attendance.end_time, isAttendance)
  }

  /** 出勤処理 */
  public async registAtWork(requestDTO: OfficeHoursRequest.Regist.AtWorkRequestDTO): Promise<OfficeHoursResponse.Regist.AtWorkResponseDTO> {
    const userNo = requestDTO.getUserNo()
    const attendanceTime = requestDTO.getAttendanceTime().toDate()

    // 出勤の確認
    const existsAttendance = await this.existsAttendance(userNo)
    if (existsAttendance) {
      return Bluebird.reject(new ApplicationError(ErrorCode.RequestError))
    }

    // 出勤登録
    const attendance = await Attendance.create({
        user_no: userNo,
        working_date: attendanceTime,
        start_time: attendanceTime,
        create_user_no: userNo,
        update_user_no: userNo
      })
    if (!attendance) {
      return Bluebird.reject(new ApplicationError(ErrorCode.ServerError))
    }

    return Bluebird.resolve(new OfficeHoursResponse.Regist.AtWorkResponseDTO(attendance.attendance_no))
  }

  /** 退勤処理 */
  public async registLeaveWork(requestDTO: OfficeHoursRequest.Regist.LeaveWorkRequestDTO): Promise<OfficeHoursResponse.Regist.LeaveWorkResponseDTO> {
    const userNo = requestDTO.getUserNo()
    const leaveTime = requestDTO.getLeaveTime()

    // 出勤の確認
    const attendance = await this.existsAttendance(userNo)
    if (!attendance) {
      return Bluebird.reject(new ApplicationError(ErrorCode.NotFound))
    }

    // 出勤時間
    const startTime = moment(attendance.start_time)

    // 退勤時間登録
    await attendance.update({end_time: leaveTime.toDate()})

    // 完了
    return Bluebird.resolve(new OfficeHoursResponse.Regist.LeaveWorkResponseDTO(attendance.attendance_no))
  }
  public calcRestTime(startTime: moment.Moment, leaveTime: moment.Moment) {
    const diff = leaveTime.diff(startTime, 'minutes')
    return this.calcRestTimeMain(diff)
  }
  private calcRestTimeMain(diffMinutes: number) {
    let restTime: number = 60
    if (diffMinutes <= 360) {
      // 6時間以下の場合休憩「0時間」
      restTime = 0
    } else {
      restTime = 60
      if (diffMinutes > 540) {
        // 9時間以上の場合余りの勤務時間から追加の休憩時間を計算
        let extDiff = diffMinutes - 540
        console.log ('extDiff:' + extDiff)
        const extRestCount = Math.floor(extDiff / 135)
        console.log ('extRestCount:' + extRestCount)
        restTime = restTime + extRestCount * 15
        const amari = extDiff - extRestCount * 135
        console.log ('amari:' + amari)
        if (amari > 120) {
          restTime = restTime + amari - 120
        }
      }
    }
    return restTime
  }

  // ============================================================================================
  // SQL
  // ============================================================================================
  /**
   * 退勤時間登録のない出勤情報を取得する
   * @param userNo ユーザー番号
   */
  public async existsAttendance(userNo: number) {
    const attendance = await Attendance.find({
        where: {
          user_no: userNo,
          end_time: null
        },
        order: [
          ['start_time', 'DESC']
        ]
      })

    return attendance
  }

  /**
   * 本日の最新の出退勤情報を取得する
   * @param userNo ユーザー番号
   */
  public async getTodaysRecentlyAttendance(userNo: number) {
    const now = moment()
    const attendance = await Attendance.find({
        where: {
          [Op.and]: [
            {
              user_no: userNo
            },
            Sequelize.where(
              Sequelize.fn('Date', Sequelize.col('start_time')),
              Sequelize.fn('Date', moment().toDate())
            )
          ]
        },
        order: [
          ['start_time', 'DESC']
        ]
      })

    return attendance
  }
}

export default new OfficeHoursService()
