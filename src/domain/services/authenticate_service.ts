import LoginRequestDTO from './../dto/request/login_request_dto'
import LoginResponseDTO from './../dto/response/login_response_dto'
class AuthenticateService {
  public login(requestDTO: LoginRequestDTO): LoginResponseDTO {
    // login処理
    return new LoginResponseDTO(200, 'login success!', '')
  }
}
export default AuthenticateService
