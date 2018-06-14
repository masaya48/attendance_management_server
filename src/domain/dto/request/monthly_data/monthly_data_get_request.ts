import BaseRequestDTO from './../base_request_dto'
class MonthlyDataGetDTO extends BaseRequestDTO {
  private readonly user_no: number
  private readonly month: Date
  constructor(user_no: number, month: Date) {
    super()
    this.user_no = user_no
    this.month = month
  }
  public getUserNo() {
    return this.user_no
  }
  public getAttendanceMonth() {
    return this.month
  }
}
export default MonthlyDataGetDTO