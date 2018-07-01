import BaseResponse from './../base_response'
class Response extends BaseResponse {
  protected body: Response.ResponseBody
  public constructor(status: number, message: string, attendanceNo: number, startTime: Date, endTime: Date, isAttendance: boolean) {
    super(status, message)
    this.body.results = {
      attendance_no: attendanceNo,
      start_time: startTime,
      end_time: endTime,
      is_attendance: isAttendance
    }
  }
}
declare namespace Response {
  interface ResponseResults extends BaseResponse.BaseResponseResults {
    attendance_no: number
    start_time: Date
    end_time: Date
    is_attendance: boolean
  }
  interface ResponseBody extends BaseResponse.BaseResponseBody {
    results?: ResponseResults
  }
}
export default Response