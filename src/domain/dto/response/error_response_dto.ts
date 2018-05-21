import BaseResponseDTO from './base_response_dto'
import ErrorCode from './../../../utils/constants/error_code'

class ErrorResponseDTO extends BaseResponseDTO {
  protected errorCode: ErrorCode
  constructor(errorCode: ErrorCode) {
    super()
    this.errorCode = errorCode
  }
  public getErrorCode() {
    return this.errorCode
  }
}
export default ErrorResponseDTO
