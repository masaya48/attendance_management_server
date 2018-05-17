import BaseResponseDTO from './base_response_dto'
class LoginResponseDTO extends BaseResponseDTO {
  protected readonly token:string

  constructor(status:number, message:string, token:string) {
    super(true, status, message)
    this.token = token
  }
  public getToken() {
    return this.token
  }

}
export default LoginResponseDTO
