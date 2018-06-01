import BaseRequestDTO from './../base_request_dto'
class RequestDTO extends BaseRequestDTO {
  private readonly token: string
  private readonly attendance_time: Date
  constructor(token: string, attendance_time: Date) {
    super()
    this.token = token
    this.attendance_time = attendance_time
  }
  public getToken() {
    return this.token
  }
  public getAttendanceTime() {
    return this.attendance_time
  }
}
export default RequestDTO