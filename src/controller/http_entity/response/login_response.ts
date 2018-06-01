import BaseResponse from './base_response'
class LoginResponse extends BaseResponse {
  protected body: LoginResponse.LoginResponseBody
  public constructor(status: number, message: string, token: string, employee_no: string, employee_name: string, entry_date: Date) {
    super(status, message)
    const employee = {
      no: employee_no,
      name: employee_name,
      entry_date: entry_date
    }
    this.body.results = {
      token: token,
      employee: employee
    }
  }
}
declare namespace LoginResponse {
  interface LoginResponseResults extends BaseResponse.BaseResponseResults {
    token: string
    employee: {
      no: string
      name: string
      entry_date: Date
    }
  }
  interface LoginResponseBody extends BaseResponse.BaseResponseBody {
    results?: LoginResponseResults
  }
}
export default LoginResponse