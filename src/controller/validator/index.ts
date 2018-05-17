import {check, header, body, query, param} from 'express-validator/check'
import { ErrorResponse } from '../adapters/response/response_adapter'

export default {
  getErrorResponse: (status: number, message: string, errors: any) => {
    return new ErrorResponse(status, message, errors)
  },
  login: [
    body('employee_no', 'ユーザーIDを入力して下さい')
      .exists()
      .trim()
      .isLength({min: 1}),
    body('password', 'パスワードを入力して下さい')
      .exists()
      .trim()
      .isLength({min: 1})
  ]
}
