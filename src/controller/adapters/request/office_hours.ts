import OfficeHoursDTO from '../../../domain/dto/request/office_hours_request'
import MyLoginRequest from 'my_request'
import * as timeUtil from './../../../utils/time_util'

export const check = {
  attendanceTimeConvert: ( req: MyLoginRequest ) => {
    const userNo = req.user.user_no
    return new OfficeHoursDTO.CheckAttendanceRequestDTO( userNo )
  }
}
export const regist = {
  atWorkConvert: ( req: RegistAtWorkRequest ) => {
    const attendanceTime = timeUtil.now()
    const userNo = req.user.user_no
    return new OfficeHoursDTO.Regist.AtWorkRequestDTO( userNo, attendanceTime )
  },
  leaveWorkConvert: ( req: RegistLeaveWorkRequest ) => {
    const leaveTime = timeUtil.now()
    const userNo = req.user.user_no
    return new OfficeHoursDTO.Regist.LeaveWorkRequestDTO( userNo, leaveTime )
  }
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
