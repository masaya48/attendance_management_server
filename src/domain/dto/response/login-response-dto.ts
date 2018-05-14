import BaseResponseDTO from './base-response-dto'
class LoginResponseDTO extends BaseResponseDTO {
  protected token

  constructor(status:number, message:string, token:string) {
    super(status, message)
    this.token = token
  }

  public getResponseBody(): LoginResponseDTO.IResponseBody {
    return {
      token: this.token
    }
  }
}
declare namespace LoginResponseDTO {
  interface IResponseBody extends BaseResponseDTO.IResponseBody {
    token:string;
  }
}

export default LoginResponseDTO
