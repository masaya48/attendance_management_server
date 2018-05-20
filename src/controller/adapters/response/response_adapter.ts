import * as Express from 'express'
import {Result} from 'express-validator/check'
import BaseResponseDTO from './../../../domain/dto/response/base_response_dto'
import BaseResponse from './../../http_entity/response/base_response'
import ErrorResponse, { ErrorCode } from '../../http_entity/response/error_response';
import ErrorResponseDTO from '../../../domain/dto/response/error_response_dto';
interface ResponseAdapter {
  convert(responseDTO: BaseResponseDTO): BaseResponse
}
export default ResponseAdapter
