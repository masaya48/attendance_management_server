import BaseRequestDTO from './../base_request_dto'
class RegistAtWorkDTO extends BaseRequestDTO {
  private readonly user_no: number
  private readonly attendance_time: Date
  constructor(user_no: number, attendance_time: Date) {
    super()
    this.user_no = user_no
    this.attendance_time = attendance_time
  }
  public getUserNo() {
    return this.user_no
  }
  public getAttendanceTime() {
    return this.attendance_time
  }
}
export default RegistAtWorkDTO