import BaseResponseDTO from './base_response_dto'
import Employee from 'm_employee'
class LoginResponseDTO extends BaseResponseDTO {
  protected readonly token: string
  protected readonly employee: Employee.Instance

  constructor(token:string, employee: Employee.Instance) {
    super()
    this.token = token
    this.employee = employee
  }
  public getToken() {
    return this.token
  }
  public getEmployee() {
    return this.employee
  }
}
export default LoginResponseDTO
