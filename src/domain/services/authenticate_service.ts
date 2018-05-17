// node_modules
import * as Bluebird from 'bluebird'
import * as jwt from 'jsonwebtoken'
// config
import config from './../../utils/config/my_config'
// dto
import LoginRequestDTO from './../dto/request/login_request_dto'
import LoginResponseDTO from './../dto/response/login_response_dto'
import ErrorResponseDTO from './../dto/response/error_response_dto'
// DB
import models from './../../libs/models'
import Employee from 'models/m_employee'

class AuthenticateService {
  public login(requestDTO: LoginRequestDTO): Bluebird<LoginResponseDTO> {
    const Employee = models.m_employee as Employee.Model
    return new Bluebird((resolve, reject) => {
      return Employee.findOne({
        where: {
          employee_no: requestDTO.getEmployeeNo(),
          password: requestDTO.getPassword()
        }
      })
      .then(employee => {
        if (!employee) {
          reject(new ErrorResponseDTO(401, '認証エラー'))
          return
        }
        const {employee_no, user_no} = employee
        let token:string = jwt.sign({employee_no, user_no}, config.jwt.authentication_secret_key, {algorithm: config.jwt.algorithm})
        employee.token = token
        return employee
          .save()
          .then(() => {
            resolve(new LoginResponseDTO(200, 'login success!', token))
            return
          })
      })
      .error(() => {
        reject(new ErrorResponseDTO(500, 'サーバーエラー'))
      })
    })
  }
}
export default AuthenticateService
