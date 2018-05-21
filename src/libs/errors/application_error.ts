import ErrorCode from "./../../utils/constants/error_code"

class ApplicationError extends Error {
  public readonly code: ErrorCode
  constructor(code: ErrorCode, message?: string) {
    super(message)
    this.name = 'ApplicationError'
    this.code = code
  }
}
export default ApplicationError