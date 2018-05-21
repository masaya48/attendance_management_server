import {getResources} from './../resource_util'

const errors = getResources('message.json').errors
export enum ErrorCode {
  RequestError = '0001',
  AuthError = '0002',
  ServerError = '0003'
}
export namespace ErrorCode {
  export function getMessage(code: ErrorCode): string {
    switch (code) {
      case ErrorCode.RequestError:
        return errors.request.message
      case ErrorCode.AuthError:
        return errors.authentication.message
      case ErrorCode.ServerError:
      default:
        return errors.server.message
    }
  }
  export function getStatus(code: ErrorCode): number {
    switch (code) {
      case ErrorCode.RequestError:
        return errors.request.status
      case ErrorCode.AuthError:
        return errors.authentication.status
      case ErrorCode.ServerError:
      default:
        return errors.server.status
    }
  }
}
export default ErrorCode
