import BaseRequestDTO from './../base_request_dto'
class RegistAtWorkDTO extends BaseRequestDTO {
  private readonly userNo: number
  private readonly attendanceTime: Date
  constructor(userNo: number, attendanceTime: Date) {
    super()
    this.userNo = userNo
    this.attendanceTime = attendanceTime
  }
  public getUserNo() {
    return this.userNo
  }
  public getAttendanceTime() {
    return this.attendanceTime
  }
}
export default RegistAtWorkDTO