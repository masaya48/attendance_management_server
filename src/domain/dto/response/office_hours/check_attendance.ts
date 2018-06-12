import BaseResponseDTO from './../base_response_dto'
class CheckAttendanceResponseDTO extends BaseResponseDTO {
  protected readonly attendanceNo: number
  protected readonly existsAttendance: boolean
  constructor(attendanceNo: number, isAttendance: boolean) {
    super()
    this.attendanceNo = attendanceNo
    this.existsAttendance = isAttendance
  }
  public getAttendanceNo() {
    return this.attendanceNo
  }
  public isAttendance() {
    return this.existsAttendance
  }
}
export default CheckAttendanceResponseDTO
