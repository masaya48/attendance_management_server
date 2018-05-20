import {check, header, body, query, param} from 'express-validator/check'
import ValidationErrorResponse from './../http_entity/response/validation_error_response'

export default {
  getValidateErrorResponse: (errors: any) => {
    return new ValidationErrorResponse(errors)
  },
  login: [
    body('employee_no', 'ユーザーIDを入力して下さい')
      .trim()
      .isLength({min: 1}),
    body('password', 'パスワードを入力して下さい')
      .trim()
      .isLength({min: 1})
  ],
  login_guard: [
    header('Authorization', 'tokenチェックエラー')
      .trim()
      .isLength({min: 1})
  ]
}
