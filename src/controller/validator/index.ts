import {check, header, body, query, param, Result} from 'express-validator/check'
import ValidationErrorResponse from './../http_entity/response/validation_error_response'
import ErrorCode from './../../utils/constants/error_code'
import {login_guard} from './../middlewares/authentication'

const custom = {
  isDate: (value) => {
    return !isNaN(Date.parse(value))
  }
}

export default {
  getValidateErrorResponse: (errors: Result<any>, code: ErrorCode = ErrorCode.RequestError) => {
    return new ValidationErrorResponse(code, errors)
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
      .isLength({min: 1}),
    login_guard()
  ],
  office_hours: {
    regist_at_work: [
      body('attendance_time', '出勤時間が不正です')
        .trim()
        .isLength({min: 1})
        .custom(custom.isDate)
    ]
  }
}
