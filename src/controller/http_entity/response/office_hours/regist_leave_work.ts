import BaseResponse from './../base_response'
class Response extends BaseResponse {
  protected body: Response.ResponseBody
  public constructor(status: number, message: string, attendance_no: number) {
    super(status, message)
    this.body.results = {
      attendance_no: attendance_no
    }
  }
}
declare namespace Response {
  interface ResponseResults extends BaseResponse.BaseResponseResults {
    attendance_no: number
  }
  interface ResponseBody extends BaseResponse.BaseResponseBody {
    results?: ResponseResults
  }
}
export default Response