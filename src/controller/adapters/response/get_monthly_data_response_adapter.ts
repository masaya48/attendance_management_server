import BaseResponseDTO from './../../../domain/dto/response/base_response_dto'
import MonthlyDataResponseDTO from './../../../domain/dto/response/monthly_data_get_response'
import ResponseAdapter from './response_adapter'
import MonthlyDataResponse from './../../http_entity/response/monthly_data_response'
class MonthlyDataResponseAdapter implements ResponseAdapter {
  public convert(responseDTO: MonthlyDataResponseDTO): MonthlyDataResponse {
    // const employee = responseDTO.getEmployee()
    const monthly_data = responseDTO.getMonthlyData()
    const monthly_data_list = []
    for(var i=0;i<monthly_data.length;i++){
        const data = monthly_data[i]
        const ind = data.working_date + ''
        const monthly_data_dict = {}
        monthly_data_dict['working_date'] = data.working_date
        monthly_data_dict['start_time'] = data.start_time
        monthly_data_dict['end_time'] = data.end_time
        monthly_data_dict['remarks'] = data.remarks
        monthly_data_list.push(monthly_data_dict)
    }
    return new MonthlyDataResponse(200, '成功', monthly_data_list) //, employee.employee_no, employee.employee_name, employee.entry_date)
  }
}
export default MonthlyDataResponseAdapter
