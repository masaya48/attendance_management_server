import BaseRequestDTO from './base_request_dto'
import * as moment from 'moment';
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
    private readonly attendanceTime: moment.Moment
    constructor(userNo: number, attendanceTime: moment.Moment) {
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
    private readonly leaveTime: moment.Moment
    constructor(userNo: number, leaveTime: moment.Moment) {
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
