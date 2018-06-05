import BaseRequestDTO from './../base_request_dto'
class RegistLeaveWorkDTO extends BaseRequestDTO {
  private readonly employee_no:string
  private readonly password:string
  constructor(employee_no:string, password:string) {
    super()
    this.employee_no = employee_no
    this.password = password
  }
  public getEmployeeNo() {
    return this.employee_no
  }
  public getPassword() {
    return this.password
  }
}
export default RegistLeaveWorkDTO