import BaseRequestDTO from './../base_request_dto'
class CheckAttendanceRequestDTO extends BaseRequestDTO {
  private readonly userNo: number
  constructor(userNo: number, attendanceTime: Date) {
    super()
    this.userNo = userNo
  }
  public getUserNo() {
    return this.userNo
  }
}
export default CheckAttendanceRequestDTO