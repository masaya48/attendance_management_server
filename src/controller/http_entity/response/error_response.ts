import BaseResponse from './base_response'

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
enum ErrorCode {
  ValidationError = '0001',
  AuthError = '0002',
  ServerError = '0003'
}
namespace ErrorCode {
  export function getMessage(code: ErrorCode) {
    switch (code) {
      case ErrorCode.ValidationError:
        return 'validation error'
      case ErrorCode.AuthError:
        return 'authentication error'
      case ErrorCode.ServerError:
      default:
        return 'server error'
    }
  }
  export function getStatus(code: ErrorCode) {
    switch (code) {
      case ErrorCode.ValidationError:
        return 400
      case ErrorCode.AuthError:
        return 401
      case ErrorCode.ServerError:
      default:
        return 500
    }
  }
}

export default ErrorResponse
export {
  ErrorResponse,
  ErrorCode
}