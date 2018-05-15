import * as Express from 'express'
import BaseResponseDTO from './../../../domain/dto/response/base_response_dto'
declare namespace ResponseAdapter {
  interface ResponseAdapter {
    convert(responseDTO: BaseResponseDTO): ResponseEntity
  }
  interface ResponseEntity {
    status: number
    message: string
    results?: {
      [indexed: string]: any
    }
  }
}
export default ResponseAdapter