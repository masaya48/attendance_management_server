import BaseResponse from './base_response'

class ErrorResponse extends BaseResponse {
  protected body: ErrorResponse.ErrorResponseBody
  public constructor(status: number, message: string, errorCode: ErrorCodes) {
    super(status, message)
    this.body.errors = {
      errorCode: errorCode
    }
  }
}
declare namespace ErrorResponse {
  interface ErrorResponseBody extends BaseResponse.BaseResponseBody {
    errors?: {
      errorCode: ErrorCodes
    }
  }
}
enum ErrorCodes {
  validationError = 1923487,
  test1 = 91327846,
  test2 = 9786918234,
  test3 = 0980014
}
namespace ErrorCodes {
  export function getMessage(code: ErrorCodes): string {
    switch (code) {
      case ErrorCodes.validationError:
        return 'validation error'
      case ErrorCodes.test1:
        return 'TEST1'
      case ErrorCodes.test2:
        return 'TEST2'
      case ErrorCodes.test3:
        return 'TEST3'
    }
  }
}
export default ErrorResponse
export {
  ErrorResponse,
  ErrorCodes
}