import BaseRequestDTO from './../../../domain/dto/request/base_request_dto'
import {Request} from 'express'
interface RequestAdapter {
  convert(req: Request): BaseRequestDTO
}
export default RequestAdapter
