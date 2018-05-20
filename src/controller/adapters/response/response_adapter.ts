import * as Express from 'express'
import {Result} from 'express-validator/check'
import BaseResponseDTO from './../../../domain/dto/response/base_response_dto'
import BaseResponse from './../../http_entity/response/base_response'
interface ResponseAdapter {
  convert(responseDTO: BaseResponseDTO): BaseResponse
}
export default ResponseAdapter
