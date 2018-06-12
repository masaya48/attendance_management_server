import BaseResponse from './../base_response'
class Response extends BaseResponse {
  protected body: Response.ResponseBody
  public constructor(status: number, message: string, attendanceNo: number, isAttendance: boolean) {
    super(status, message)
    this.body.results = {
      attendance_no: attendanceNo,
      is_attendance: isAttendance
    }
  }
}
declare namespace Response {
  interface ResponseResults extends BaseResponse.BaseResponseResults {
    attendance_no: number
    is_attendance: boolean
  }
  interface ResponseBody extends BaseResponse.BaseResponseBody {
    results?: ResponseResults
  }
}
export default Response