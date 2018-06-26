import LoginResponseDTO from './../../../domain/dto/response/login_response_dto'
import ResponseAdapter from './response_adapter'
import LoginResponse from './../../http_entity/response/login_response'
class LoginResponseAdapter implements ResponseAdapter {
  public convert(responseDTO: LoginResponseDTO): LoginResponse {
    const employee = responseDTO.getEmployee()
    return new LoginResponse(200, '認証成功', responseDTO.getToken(), employee.employee_no, employee.employee_name, employee.entry_date)
  }
}
export default new LoginResponseAdapter()
