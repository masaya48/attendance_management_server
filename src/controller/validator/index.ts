import {check, header, body, query, param, Result} from 'express-validator/check'
import ValidationErrorResponse from './../http_entity/response/validation_error_response'
import ErrorCode from './../../utils/constants/error_code';

export default {
  getValidateErrorResponse: (errors: Result<any>) => {
    return new ValidationErrorResponse(400, ErrorCode.RequestError, errors)
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
    header('Authorization')
      .trim()
      .isLength({min: 1})
  ]
}
