import BaseResponseDTO from './../../../domain/dto/response/base_response_dto'
import LoginResponseDTO from './../../../domain/dto/response/login_response_dto'
import ResponseAdapter from './response_adapter'
class LoginResponseAdapter implements ResponseAdapter.ResponseAdapter {
  public convert(responseDTO: LoginResponseDTO): ResponseAdapter.ResponseEntity {
    return {
      status: responseDTO.getStatus(),
      message: responseDTO.getMessage(),
      result: responseDTO.getResponseBody()
    }
  }
}