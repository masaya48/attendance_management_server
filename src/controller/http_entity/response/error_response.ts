import BaseResponse from './base_response'
import ErrorCode from './../../../utils/constants/error_code'

class ErrorResponse extends BaseResponse {
  protected body: ErrorResponse.ErrorResponseBody
  public constructor(code: ErrorCode) {
    super(ErrorCode.getStatus(code), ErrorCode.getMessage(code))
    this.body.errors = {
      errorCode: code
    }
  }
}
declare namespace ErrorResponse {
  interface ErrorResponseBody extends BaseResponse.BaseResponseBody {
    errors?: {
      errorCode: ErrorCode
    }
  }
}
export default ErrorResponse
export {
  ErrorResponse
}