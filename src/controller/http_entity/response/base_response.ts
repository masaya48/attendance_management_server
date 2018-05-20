class BaseResponse {
  protected body: BaseResponse.BaseResponseBody
  public constructor(status: number, message: string) {
    this.body = {
      status: status,
      message: message
    }
  }
  public getBody(): BaseResponse.BaseResponseBody {
    return this.body
  }
  public getStatus() {
    return this.body.status
  }
  public getMessage() {
    return this.body.message
  }
}
declare namespace BaseResponse {
  interface BaseResponseResults {}
  interface BaseResponseBody {
    status: number
    message: string
    results?: BaseResponseResults
  }
}
export default BaseResponse
export {
  BaseResponse
}
