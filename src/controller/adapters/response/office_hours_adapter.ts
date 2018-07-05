import * as OfficeHoursResponseDTO from '../../../domain/dto/response/office_hours_response'
import CheckAttendanceResponse from './../../http_entity/response/office_hours/check_attendance'
import RegistAtWorkResponse from './../../http_entity/response/office_hours/regist_at_work'
import RegistLeaveWorkResponse from './../../http_entity/response/office_hours/regist_leave_work'

export const check = {
  attendanceTimeConvert: (responseDTO: OfficeHoursResponseDTO.CheckAttendanceResponseDTO) => {
    return new CheckAttendanceResponse(200, '成功', responseDTO.getAttendanceNo(), responseDTO.getStartTime(), responseDTO.getEndTime(), responseDTO.isAttendance())
  }
}
export const regist = {
  atWorkConvert: (responseDTO: OfficeHoursResponseDTO.Regist.AtWorkResponseDTO) => {
    return new RegistAtWorkResponse(200, '登録完了', responseDTO.getAttendanceNo())
  },
  leaveWorkConvert: ( responseDTO: OfficeHoursResponseDTO.Regist.LeaveWorkResponseDTO ) => {
    return new RegistLeaveWorkResponse(200, '登録完了', responseDTO.getAttendanceNo())
  }
}

// export
export default {
  check,
  regist
}
