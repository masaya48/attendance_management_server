// node_modules
import * as Express from 'express'

import RequestAdapter from './../request_adapter'
import RegistAtWorkRequestDTO from './../../../../domain/dto/request/office_hours/regist_at_work'
import MEmployee from 'm_employee';
class RegistAtWorkAdapter implements RequestAdapter {
  public convert(req: Request): RegistAtWorkRequestDTO {
    const user = req.user
    const attendanceTime = req.body.attendance_time
    return new RegistAtWorkRequestDTO(user.user_no, attendanceTime)
  }
}
interface Request extends Express.Request {
  user: MEmployee.Instance,
  body: {
    attendance_time: Date
  }
}
export default RegistAtWorkAdapter
