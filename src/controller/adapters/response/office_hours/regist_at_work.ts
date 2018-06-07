import BaseResponseDTO from './../../../../domain/dto/response/base_response_dto'
import RegistAtWorkResponseDTO from './../../../../domain/dto/response/office_hours/regist_at_work'
import ResponseAdapter from './../response_adapter'
import RegistAtWorkResponse from './../../../http_entity/response/office_hours/regist_at_work'
class RegistAtWorkResponseAdapter implements ResponseAdapter {
  public convert(responseDTO: RegistAtWorkResponseDTO): RegistAtWorkResponse {
    return new RegistAtWorkResponse(200, '登録完了', responseDTO.getAttendanceNo())
  }
}
export default RegistAtWorkResponseAdapter
