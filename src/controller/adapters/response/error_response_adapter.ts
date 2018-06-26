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
export default new ErrorResponseAdapter()
