import ResponseAdapter from './response_adapter'
import LoginResponse from './../../http_entity/response/login_response'
import ErrorResponseDTO from '../../../domain/dto/response/error_response_dto';
import { ErrorResponse, ErrorCode } from '../../http_entity/response/error_response';
class ErrorResponseAdapter {
  public convert(responseDTO: ErrorResponseDTO): ErrorResponse {
    return new ErrorResponse(responseDTO.getErrorCode())
  }
}
export default ErrorResponseAdapter
