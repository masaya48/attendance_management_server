import BaseResponseDTO from './base_response_dto'
import { ErrorCode } from '../../../controller/http_entity/response/error_response';
class ErrorResponseDTO extends BaseResponseDTO {
  protected errorCode: ErrorCode
  constructor(status: number, message: string, errorCode: ErrorCode) {
    super(status, message)
    this.errorCode = errorCode
  }
  public getErrorCode() {
    return this.errorCode
  }
}
export default ErrorResponseDTO
