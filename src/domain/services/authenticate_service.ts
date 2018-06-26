// node_modules
import * as Bluebird from 'bluebird'
import * as jwt from 'jsonwebtoken'
// config
import config from './../../libs/config'
// error
import ApplicationError from './../../libs/errors/application_error'
// dto
import LoginRequestDTO from './../dto/request/login_request_dto'
import LoginResponseDTO from './../dto/response/login_response_dto'
// DB
import models from './../../libs/models'
import Employee from 'm_employee'
import ErrorCode from './../../utils/constants/error_code'

class AuthenticateService {
  public login(requestDTO: LoginRequestDTO): Bluebird<LoginResponseDTO> {
    return new Bluebird((resolve, reject) => {
      const Employee = models.m_employee as Employee.Model
      return Employee.findOne({
        where: {
          employee_no: requestDTO.getEmployeeNo(),
          password: requestDTO.getPassword()
        }
      })
      .then(employee => {
        if (!employee) {
          reject(new ApplicationError(ErrorCode.AuthError))
          return
        }

        const {employee_no, user_no} = employee
        let token:string = jwt.sign({employee_no, user_no}, config.jwt.authentication_secret_key, {algorithm: config.jwt.algorithm})
        employee.token = token
        return employee
          .save()
          .then(() => {
            resolve(new LoginResponseDTO(token, employee))
            return
          })
      })
      .catch(() => {
        reject(new ApplicationError(ErrorCode.ServerError))
        return
      })
    })
  }

  // よくわかりゃん…
  public verifyToken( token ): Bluebird<Employee.Instance> {
    return new Bluebird(( resolve, reject ) => {
      jwt.verify(token, config.jwt.authentication_secret_key, { algorithms: [config.jwt.algorithm] }, ( err, decoded ) => {
        if (err) {
          // 複合化失敗
          reject( new ApplicationError( ErrorCode.AuthError ) )
          return
        }

        const Employee = models.m_employee as Employee.Model
        return Employee
          .findOne({
            where: {
              token: token,
              user_no: decoded['user_no']
            }
          })
          .then(employee => {
            if (!employee) {
              // 検索できず
              reject(new ApplicationError(ErrorCode.AuthError))
              return
            }
            // 成功
            resolve(employee)
            return
          })
          .error(() => {
            reject(new ApplicationError(ErrorCode.AuthError))
            return
          })
      })
    })
  }
}
export default new AuthenticateService()
