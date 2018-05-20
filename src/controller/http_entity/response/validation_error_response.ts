import {Result} from 'express-validator/check'
import {ErrorResponse, ErrorCode} from './error_response'

class ValidationErrorResponse extends ErrorResponse {
  protected body: ValidationErrorResponse.ValidationErrorResponseBody
  public constructor(status: number = 400, code: ErrorCode = ErrorCode.validationError, errors?: Result) {
    const errorMessage = ErrorCode.getMessage(code)
    super(status, errorMessage, code)
    if (!errors) {
      return
    }
    const map = errors.mapped()
    const params: ValidationErrorResponse.ValidationErrorParam[] = []
    Object.keys(map).forEach(paramName => {
      const error = map[paramName]
      const param: ValidationErrorResponse.ValidationErrorParam = {
        param: error.param,
        value: error.value,
        location: error.location,
        message: error.msg
      }
      params.push(param)
    })
    this.body.errors.params = params
  }
}
declare namespace ValidationErrorResponse {
  interface ValidationErrorParam {
    param: string
    value: any
    location: string
    message: string
  }
  interface ValidationErrorResponseBody extends ErrorResponse.ErrorResponseBody {
    errors?: {
      errorCode: ErrorCode
      params?: ValidationErrorParam[]
    }
  }
}
export default ValidationErrorResponse