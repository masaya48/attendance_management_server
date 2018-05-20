// node_modules
import * as Express from 'express'

import RequestAdapter from './request_adapter'
import LoginRequestDTO from './../../../domain/dto/request/login_request_dto'
import BaseRequestDTO from './../../../domain/dto/request/base_request_dto'
class LoginRequestAdapter implements RequestAdapter {
  public convert(req: LoginRequest): LoginRequestDTO {
    const employee_no = req.body.employee_no
    const password = req.body.password
    return new LoginRequestDTO(employee_no, password)
  }
}
interface LoginRequest extends Express.Request {
  body: {
    employee_no: string,
    password: string,
  }
}
export default LoginRequestAdapter
