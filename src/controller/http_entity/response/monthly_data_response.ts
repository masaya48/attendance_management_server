import BaseResponse from './base_response'
import { Dictionary } from 'lodash';
class MonthlyDataResponse extends BaseResponse {
  protected body: MonthlyDataResponse.MonthlyDataResponseBody
  public constructor(status: number, message: string, monthly_data: {})  {//, employee_no: string, employee_name: string, entry_date: Date) {
    super(status, message)
    //const employee = {
    //  no: employee_no,
    //  name: employee_name,
    //  entry_date: entry_date
    //}
    this.body.results = {
      monthly_data: monthly_data,
      //employee: employee
    }
  }
}
declare namespace MonthlyDataResponse {
  interface MonthlyDataResponseResults extends BaseResponse.BaseResponseResults {
    monthly_data: {}
    //employee: {
    //  no: string
    //  name: string
    //  entry_date: Date
    //}
  }
  interface MonthlyDataResponseBody extends BaseResponse.BaseResponseBody {
    results?: MonthlyDataResponseResults
  }
}
export default MonthlyDataResponse