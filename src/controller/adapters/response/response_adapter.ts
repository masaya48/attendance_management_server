import * as Express from 'express'
import {Result, param} from 'express-validator/check'
import BaseResponseDTO from './../../../domain/dto/response/base_response_dto'
interface ResponseAdapter {
  convert(responseDTO: BaseResponseDTO): ResponseBody
}
interface ResponseResults {}
interface ResponseBody {
  status: number
  message: string
  results?: ResponseResults
}
interface ErrorResponseBody extends ResponseBody {
  errors?: {
    errorCode: ErrorCodes
  }
}
interface ValidationErrorResponseBody extends ErrorResponseBody {
  errors?: {
    errorCode: ErrorCodes
    params?: ErrorParam[]
  }
}
interface ErrorParam {
  param: string
  value: any
  location: string
  message: string
}
enum ErrorCodes {
  validationError = 1923487,
  test1 = 91327846,
  test2 = 9786918234,
  test3 = 0980014
}
class ValidationErrorResponse {
  private body: ValidationErrorResponseBody
  public constructor(status: number, message: string, errors?: Result) {
    const map = errors.mapped()
    const params: ErrorParam[] = []
    Object.keys(map).forEach(paramName => {
      const error = map[paramName]
      const param: ErrorParam = {
        param: error.param,
        value: error.value,
        location: error.location,
        message: error.msg
      }
      params.push(param)
    })
    this.body = {
      status: status,
      message: message,
      errors: {
        errorCode: ErrorCodes.validationError,
        params: params
      }
    }
  }
  public getBody() {
    return this.body
  }
  public getStatus() {
    return this.body.status
  }
  public getMessage() {
    return this.body.message
  }
}
export {
  ResponseAdapter,
  ResponseBody,
  ResponseResults,
  ValidationErrorResponse
}
