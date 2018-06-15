import BaseRequestDTO from './base_request_dto'
export class CheckAttendanceRequestDTO extends BaseRequestDTO {
  private readonly userNo: number
  constructor(userNo: number) {
    super()
    this.userNo = userNo
  }
  public getUserNo() {
    return this.userNo
  }
}
export namespace Regist {
  export class AtWorkRequestDTO extends BaseRequestDTO {
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
  export class LeaveWorkRequestDTO extends BaseRequestDTO {
    private readonly userNo: number
    private readonly leaveTime: Date
    constructor(userNo: number, leaveTime: Date) {
      super()
      this.userNo = userNo
      this.leaveTime = leaveTime
    }
    public getUserNo() {
      return this.userNo
    }
    public getLeaveTime() {
      return this.leaveTime
    }
  }
}
export default {
  CheckAttendanceRequestDTO,
  Regist
}
