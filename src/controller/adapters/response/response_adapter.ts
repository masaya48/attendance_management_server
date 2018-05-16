import * as Express from 'express'
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
  results?: {
    errors: any
  }
}
class ErrorResponse {
  private body: ErrorResponseBody
  public constructor(status: number, message: string, errors?: any) {
    this.body = {
      status: status,
      message: message,
      results: {
        errors: errors
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
  ErrorResponse
}
