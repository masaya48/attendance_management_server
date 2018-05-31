import { getResourceData } from './../resource_util'

// HTTPステータス用リソースを取得
const http_status = getResourceData('message.json').http_status

export enum ErrorCode {
  RequestError = '0001',
  AuthError = '0002',
  ServerError = '0003',
  NotFound = '0004'
}
export namespace ErrorCode {
  /**
   * エラーメッセージ取得
   *
   * @param code ErrorCode
   */
  export function getMessage(code: ErrorCode): string {
    switch (code) {
      case ErrorCode.RequestError:
        return http_status.request.message
      case ErrorCode.AuthError:
        return http_status.authentication.message
      case ErrorCode.NotFound:
        return http_status.notFound.message
      case ErrorCode.ServerError:
      default:
        return http_status.server.message
    }
  }

  /**
   * HTTPステータスコード取得
   *
   * @param code ErrorCode
   */
  export function getStatus(code: ErrorCode): number {
    switch (code) {
      case ErrorCode.RequestError:
        return http_status.request.status
      case ErrorCode.AuthError:
        return http_status.authentication.status
      case ErrorCode.NotFound:
        return http_status.notFound.status
      case ErrorCode.ServerError:
      default:
        return http_status.server.status
    }
  }
}

export default ErrorCode
