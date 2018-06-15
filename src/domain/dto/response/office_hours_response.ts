import BaseResponseDTO from './base_response_dto'
export class CheckAttendanceResponseDTO extends BaseResponseDTO {
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
export namespace Regist {
  export class AtWorkResponseDTO extends BaseResponseDTO {
    protected readonly attendanceNo: number

    constructor(attendanceNo: number) {
      super()
      this.attendanceNo = attendanceNo
    }
    public getAttendanceNo() {
      return this.attendanceNo
    }
  }
}
export default {
  CheckAttendanceResponseDTO,
  Regist
}
