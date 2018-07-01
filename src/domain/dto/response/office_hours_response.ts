import BaseResponseDTO from './base_response_dto'
export class CheckAttendanceResponseDTO extends BaseResponseDTO {
  protected readonly attendanceNo: number
  protected readonly startTime: Date
  protected readonly endTime: Date
  protected readonly existsAttendance: boolean
  constructor(attendanceNo: number, startTime: Date, endTime: Date, isAttendance: boolean) {
    super()
    this.attendanceNo = attendanceNo
    this.startTime = startTime
    this.endTime = endTime
    this.existsAttendance = isAttendance
  }
  public getAttendanceNo() {
    return this.attendanceNo
  }
  public getStartTime() {
    return this.startTime
  }
  public getEndTime() {
    return this.endTime
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
  export class LeaveWorkResponseDTO extends BaseResponseDTO {
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
