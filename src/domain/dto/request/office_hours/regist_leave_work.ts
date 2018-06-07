import BaseRequestDTO from './../base_request_dto'
class RegistLeaveWorRequestkDTO extends BaseRequestDTO {
  private readonly attendanceNo: number
  private readonly leaveTime: Date
  constructor(attendanceNo: number, leaveTime: Date) {
    super()
    this.attendanceNo = attendanceNo
    this.leaveTime = leaveTime
  }
  public getAttendanceNo() {
    return this.attendanceNo
  }
  public getLeaveTime() {
    return this.leaveTime
  }
}
export default RegistLeaveWorRequestkDTO