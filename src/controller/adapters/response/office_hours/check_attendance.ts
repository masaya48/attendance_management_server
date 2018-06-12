import BaseResponseDTO from './../../../../domain/dto/response/base_response_dto'
import CheckAttndanceResponseDTO from './../../../../domain/dto/response/office_hours/check_attendance'
import ResponseAdapter from './../response_adapter'
import CheckAttendanceResponse from './../../../http_entity/response/office_hours/check_attendance'
class CheckAttendanceResponseAdapter implements ResponseAdapter {
  public convert(responseDTO: CheckAttndanceResponseDTO): CheckAttendanceResponse {
    return new CheckAttendanceResponse(200, '成功', responseDTO.getAttendanceNo(), responseDTO.isAttendance())
  }
}
export default CheckAttendanceResponseAdapter
