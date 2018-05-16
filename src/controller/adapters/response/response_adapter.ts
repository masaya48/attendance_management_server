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
export {
  ResponseAdapter,
  ResponseBody,
  ResponseResults
}
