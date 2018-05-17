// node_modules
import * as Bluebird from 'bluebird'
import * as jwt from 'jsonwebtoken'
// config
import config from './../../libs/config'
// dto
import BaseResponseDTO from './../dto/response/base_response_dto'
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

  // よくわかりゃん…
  public verifyToken(token): Bluebird<boolean> {
    const Employee = models.m_employee as Employee.Model
    return new Bluebird((resolve, reject) => {
      jwt.verify(token, config.jwt.authentication_secret_key, {algorithms: [config.jwt.algorithm]}, (err, decoded) => {
        if (err) {
          // 複合化失敗
          resolve(false);
          return;
        }

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
              resolve(false);
              return;
            }
            // 成功
            resolve(true);
            return;
          });
      });
    })
  }
}
export default AuthenticateService
