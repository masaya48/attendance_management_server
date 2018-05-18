import {check, header, body, query, param} from 'express-validator/check'
import { ValidationErrorResponse } from '../adapters/response/response_adapter'

export default {
  getValidateErrorResponse: (status: number, message: string, errors: any) => {
    return new ValidationErrorResponse(status, message, errors)
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
  ],
  login_guard: [
    header('Authenticato', 'tokenチェックエラー')
      .trim()
      .isLength({min: 1})
  ]
}
