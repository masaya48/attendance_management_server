import BaseRequestDTO from './base_request_dto'
class LoginRequestDTO extends BaseRequestDTO {
  private readonly employeeNo:string
  private readonly password:string
  constructor(employeeNo:string, password:string) {
    super()
    this.employeeNo = employeeNo
    this.password = password
  }
  public getEmployeeNo() {
    return this.employeeNo
  }
  public getPassword() {
    return this.password
  }
}
export default LoginRequestDTO