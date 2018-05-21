import ResponseAdapter from './response_adapter'
import LoginResponse from './../../http_entity/response/login_response'
import ErrorResponseDTO from './../../../domain/dto/response/error_response_dto'
import ErrorResponse from './../../http_entity/response/error_response'
import ErrorCode from './../../../utils/constants/error_code'
import ApplicationError from './../../../libs/errors/application_error'
class ErrorResponseAdapter {
  public convert(error: ApplicationError): ErrorResponse {
    if (!error.code) {
      return new ErrorResponse(ErrorCode.ServerError)
    }
    return new ErrorResponse(error.code)
  }
}
export default ErrorResponseAdapter
