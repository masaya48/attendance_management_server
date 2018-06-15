import * as OfficeHoursResponseDTO from '../../../domain/dto/response/office_hours_response'
import CheckAttendanceResponse from './../../http_entity/response/office_hours/check_attendance'
import RegistAtWorkResponse from './../../http_entity/response/office_hours/regist_at_work'
import MyLoginRequest from 'my_request'

export const check = {
  attendanceTimeConvert: (responseDTO: OfficeHoursResponseDTO.CheckAttendanceResponseDTO) => {
    return new CheckAttendanceResponse(200, '成功', responseDTO.getAttendanceNo(), responseDTO.isAttendance())
  }
}
export const regist = {
  atWorkConvert: (responseDTO: OfficeHoursResponseDTO.Regist.AtWorkResponseDTO) => {
    return new RegistAtWorkResponse(200, '登録完了', responseDTO.getAttendanceNo())
  }
  // leaveWorkConvert: ( req: RegistLeaveWorkRequest ) => {
  //   const leaveTime = req.body.leave_time as Date
  //   const userNo = req.user.user_no as number
  //   return new OfficeHoursResponseDTO.Regist.(userNo, leaveTime)
  // }
}

// 型定義
interface RegistAtWorkRequest extends MyLoginRequest {
  body: {
    attendance_time: Date
  }
}
interface RegistLeaveWorkRequest extends MyLoginRequest {
  body: {
    leave_time: Date
  }
}

// export
export default {
  check,
  regist
}
