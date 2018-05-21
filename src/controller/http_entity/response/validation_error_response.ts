import {Result} from 'express-validator/check'
import ErrorResponse from './error_response'
import ErrorCode from './../../../utils/constants/error_code'

class ValidationErrorResponse extends ErrorResponse {
  protected body: ValidationErrorResponse.ValidationErrorResponseBody
  public constructor(status: number = 400, code: ErrorCode = ErrorCode.RequestError, errors?: Result) {
    super(code)
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