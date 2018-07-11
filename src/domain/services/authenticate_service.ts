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
  /**
   * 初回ログイン処理
   * @param requestDTO
   */
  public async login(requestDTO: LoginRequestDTO): Promise<LoginResponseDTO> {
    const Employee = models.m_employee
    const employee = await Employee.findOne({
      where: {
        employee_no: requestDTO.getEmployeeNo(),
        password: requestDTO.getPassword()
      }
    })

    if (!employee) {
      return Bluebird.reject(new ApplicationError(ErrorCode.AuthError))
    }

    const {employee_no: employeeNo, user_no: userNo} = employee
    const payload: payload = {
      employee_no: employeeNo,
      user_no: userNo
    }
    const token = jwt.sign(payload, config.jwt.authentication_secret_key, {algorithm: config.jwt.algorithm})
    await employee.update({token: token})
    return new LoginResponseDTO(token, employee)
  }

  // よくわかりゃん…
  public verifyToken( token ): Bluebird<Employee.Instance> {
    return new Bluebird(( resolve, reject ) => {
      jwt.verify(token, config.jwt.authentication_secret_key, { algorithms: [config.jwt.algorithm] }, ( err, decoded: payload ) => {
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
              user_no: decoded.user_no
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
  public async verifyToken2( token ): Promise<Employee.Instance> {
    const a = await Bluebird.promisifyAll(jwt.verify)(token, config.jwt.authentication_secret_key, { algorithms: [config.jwt.algorithm] }) as payload
    console.log(a)

    jwt.verify(token, config.jwt.authentication_secret_key, { algorithms: [config.jwt.algorithm] }, ( err, decoded: payload ) => {
      if (err) {
        // 複合化失敗
        return Bluebird.reject(new ApplicationError( ErrorCode.AuthError ))
      }
    })
  return
  }
}
type payload = {
  employee_no: string
  user_no: number
}
export default new AuthenticateService()
