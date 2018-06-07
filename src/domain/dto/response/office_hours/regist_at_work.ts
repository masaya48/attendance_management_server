import BaseResponseDTO from './../base_response_dto'
class RegistAtWorkResponseDTO extends BaseResponseDTO {
  protected readonly attendanceNo: number

  constructor(attendanceNo: number) {
    super()
    this.attendanceNo = attendanceNo
  }
  public getAttendanceNo() {
    return this.attendanceNo
  }
}
export default RegistAtWorkResponseDTO
