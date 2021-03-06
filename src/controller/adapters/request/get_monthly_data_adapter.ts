// node_modules
import * as Express from 'express'

import RequestAdapter from './request_adapter'
import MonthlyDataRequestDTO from './../../../domain/dto/request/monthly_data_get_request'
import BaseRequestDTO from './../../../domain/dto/request/base_request_dto'
import MyLoginRequest from 'my_request'
import { compareSync } from 'bcrypt';
import * as moment from 'moment'
class MonthlyDataRequestAdapter implements RequestAdapter {
  public convert(req: MonthlyDataRequest): MonthlyDataRequestDTO {
    const user_no = req.user.user_no
    const month = moment(req.body.get_data_month).toDate()
    return new MonthlyDataRequestDTO(user_no, month)
  }
}
interface MonthlyDataRequest extends MyLoginRequest {
  body: {
    get_data_month: string,
  }
}
export default MonthlyDataRequestAdapter
