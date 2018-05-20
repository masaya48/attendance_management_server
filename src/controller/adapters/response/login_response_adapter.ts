import BaseResponseDTO from './../../../domain/dto/response/base_response_dto'
import LoginResponseDTO from './../../../domain/dto/response/login_response_dto'
import ResponseAdapter from './response_adapter'
import LoginResponse from './../../http_entity/response/login_response'
class LoginResponseAdapter implements ResponseAdapter {
  public convert(responseDTO: LoginResponseDTO): LoginResponse {
    return new LoginResponse(responseDTO.getStatus(), responseDTO.getMessage(), responseDTO.getToken())
  }
}
export default LoginResponseAdapter
