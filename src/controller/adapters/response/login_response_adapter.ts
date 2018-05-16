import BaseResponseDTO from './../../../domain/dto/response/base_response_dto'
import LoginResponseDTO from './../../../domain/dto/response/login_response_dto'
import {ResponseAdapter, ResponseBody, ResponseResults} from './response_adapter'
class LoginResponseAdapter implements ResponseAdapter {
  public convert(responseDTO: LoginResponseDTO): LoginResponseBody {
    return {
      status: responseDTO.getStatus(),
      message: responseDTO.getMessage(),
      results: {
        token: responseDTO.getToken()
      }
    }
  }
}
interface LoginResponseResults extends ResponseResults {
  token: string
}
interface LoginResponseBody extends ResponseBody {
  results: LoginResponseResults
}
export default LoginResponseAdapter
