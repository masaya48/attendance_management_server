import BaseResponseDTO from './base_response_dto'
class ErrorResponseDTO extends BaseResponseDTO {
  constructor(status: number, message: string) {
    super(status, message)
  }
}
export default ErrorResponseDTO
