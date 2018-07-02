// node_modules
import * as Express from 'express'
import {validationResult} from 'express-validator/check'
// validator
import validator from './../../../validator'
// adapter
import holidayRequestAdapter from '../../../adapters/request/holiday_request_adapter'
import holidayResponseAdapter from '../../../adapters/response/holiday_response_adapter'
// service
import officeHoursService from './../../../../domain/services/office_hours_service'
// error
import errorResponseAdapter from '../../../adapters/response/error_response_adapter';
import ApplicationError from '../../../../libs/errors/application_error';

const router = Express.Router()

router.post('/get', (req, res, next) => {
  // バリデーションチェック
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorResponse = validator.getValidateErrorResponse(errors)
    return res.status(errorResponse.getStatus()).json(errorResponse.getBody())
  }
})

router.post('/regist', (req, res, next) => {
  // バリデーションチェック
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorResponse = validator.getValidateErrorResponse(errors)
    return res.status(errorResponse.getStatus()).json(errorResponse.getBody())
  }
})

router.post('/update', (req, res, next) => {
  // バリデーションチェック
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorResponse = validator.getValidateErrorResponse(errors)
    return res.status(errorResponse.getStatus()).json(errorResponse.getBody())
  }
})

export default router
