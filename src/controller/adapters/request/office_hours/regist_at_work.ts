// node_modules
import * as Express from 'express'
import * as jwt from 'jsonwebtoken'

import RequestAdapter from './../request_adapter'
import RegistAtWorkRequestDTO from './../../../../domain/dto/request/office_hours/regist_at_work'
import MEmployee from 'm_employee';
class RegistAtWorkAdapter implements RequestAdapter {
  public convert(req: Request): RegistAtWorkRequestDTO {
    const attendanceTime = req.body.attendance_time
    const user_no = req.user.user_no
    return new RegistAtWorkRequestDTO(user_no, attendanceTime)
  }
}
interface Request extends Express.Request {
  user: MEmployee.Instance
  body: {
    attendance_time: Date
  }
}
export default RegistAtWorkAdapter
