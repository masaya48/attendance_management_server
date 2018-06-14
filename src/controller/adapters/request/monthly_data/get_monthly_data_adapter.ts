// node_modules
import * as Express from 'express'

import RequestAdapter from './../request_adapter'
import MonthlyDataRequestDTO from './../../../../domain/dto/request/monthly_data/monthly_data_get_request'
import BaseRequestDTO from './../../../../domain/dto/request/base_request_dto'
class MonthlyDataRequestAdapter implements RequestAdapter {
  public convert(req: MonthlyDataRequest): MonthlyDataRequestDTO {
    const user_no = req.body.user_no
    const month = req.body.month
    return new MonthlyDataRequestDTO(user_no, month)
  }
}
interface MonthlyDataRequest extends Express.Request {
  body: {
    user_no: number,
    month: Date,
  }
}
export default MonthlyDataRequestAdapter
