import BaseResponseDTO from './base_response_dto'
import * as moment from 'moment'

export class HolidayListResponseDTO extends BaseResponseDTO {
  private readonly userNo: number
  private readonly month: moment.Moment
  constructor(userNo: number, month: moment.Moment) {
    super()
    this.month = month
    this.userNo = userNo
  }
  public getUserNO() {
    return this.userNo
  }
  public getMonth() {
    return this.month
  }
}

export default {
  HolidayListResponseDTO
}
