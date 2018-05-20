import BaseResponse from './base_response'

class ErrorResponse extends BaseResponse {
  protected body: ErrorResponse.ErrorResponseBody
  public constructor(status: number, message: string, code: ErrorCode) {
    super(status, message)
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
enum ErrorCode {
  validationError = 1923487,
  authError = 91327846,
  serverError = 9786918234,
  test3 = 0980014
}
namespace ErrorCode {
  export function getMessage(code: ErrorCode): string {
    switch (code) {
      case ErrorCode.validationError:
        return 'validation error'
      case ErrorCode.authError:
        return 'authentication error'
      case ErrorCode.serverError:
        return 'server error'
      case ErrorCode.test3:
        return 'TEST3'
    }
  }
}
export default ErrorResponse
export {
  ErrorResponse,
  ErrorCode
}