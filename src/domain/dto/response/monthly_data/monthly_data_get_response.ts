import BaseResponseDTO from '../base_response_dto'
//import Employee from 'm_employee'
import Attendance from 't_attendance'
class MonthlyDataResponseDTO extends BaseResponseDTO {
  protected readonly monthly_data: Attendance.Instance[]
  // protected readonly employee: Employee.Instance

  constructor(monthly_data:Attendance.Instance[]) {//, employee: Employee.Instance) {
    super()
    this.monthly_data = monthly_data
    // this.employee = employee
  }
  public getMonthlyData() {
    return this.monthly_data
  }
  //public getEmployee() {
  //  return this.employee
  //}
}
export default MonthlyDataResponseDTO
