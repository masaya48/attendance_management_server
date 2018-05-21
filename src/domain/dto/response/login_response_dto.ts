import BaseResponseDTO from './base_response_dto'
class LoginResponseDTO extends BaseResponseDTO {
  protected readonly token:string

  constructor(token:string) {
    super()
    this.token = token
  }
  public getToken() {
    return this.token
  }

}
export default LoginResponseDTO
