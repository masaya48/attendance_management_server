import BaseResponse from './base_response'
class LoginResponse extends BaseResponse {
  protected body: LoginResponse.LoginResponseBody
  public constructor(status: number, message: string, token: string) {
    super(status, message)
    this.body.results = {
      token: token
    }
  }
}
declare namespace LoginResponse {
  interface LoginResponseResults extends BaseResponse.BaseResponseResults {
    token: string
  }
  interface LoginResponseBody extends BaseResponse.BaseResponseBody {
    results?: LoginResponseResults
  }
}
export default LoginResponse