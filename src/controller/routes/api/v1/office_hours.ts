// node_modules
import * as Express from 'express'
import {validationResult} from 'express-validator/check'
// validator
import validator from './../../../validator'
// adapter
import officeHoursRequestAdapter from './../../../adapters/request/office_hours'
import officeHoursResponseAdapter from './../../../adapters/response/office_hours'
// service
import officeHoursService from './../../../../domain/services/office_hours_service'
// error
import errorResponseAdapter from '../../../adapters/response/error_response_adapter';
import ApplicationError from '../../../../libs/errors/application_error';

const router = Express.Router()

router.post('/check/attendance', (req: any, res, next) => {
  return officeHoursService
    .checkAttendance(req.user.user_no)
    .then(responseDTO => {
      const response = officeHoursResponseAdapter.check.attendanceTimeConvert(responseDTO)
      return res.status(response.getStatus()).json(response.getBody())
    })
    .catch((err: ApplicationError) => {
      const response = errorResponseAdapter.convert(err)
      return res.status(response.getStatus()).json(response.getBody())
    })
})

router.post('/regist/at_work', (req, res, next) => {
  // バリデーションチェック
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorResponse = validator.getValidateErrorResponse(errors)
    return res.status(errorResponse.getStatus()).json(errorResponse.getBody())
  }

  return officeHoursService
    .registAtWork(officeHoursRequestAdapter.regist.atWorkConvert(req))
    .then(responceDTO => {
      const response = officeHoursResponseAdapter.regist.atWorkConvert(responceDTO)
      return res.status(response.getStatus()).json(response.getBody())
    })
    .catch((err: ApplicationError) => {
      const response = errorResponseAdapter.convert(err)
      return res.status(response.getStatus()).json(response.getBody())
    })
})

router.post('/regist/leave_work', (req, res, next) => {
  // バリデーションチェック
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorResponse = validator.getValidateErrorResponse(errors)
    return res.status(errorResponse.getStatus()).json(errorResponse.getBody())
  }

  return officeHoursService
    .registLeaveWork(officeHoursRequestAdapter.regist.leaveWorkConvert(req))
    .then(responceDTO => {
      const response = officeHoursResponseAdapter.regist.leaveWorkConvert(responceDTO)
      return res.status(response.getStatus()).json(response.getBody())
    })
    .catch((err: ApplicationError) => {
      const response = errorResponseAdapter.convert(err)
      return res.status(response.getStatus()).json(response.getBody())
    })
})

export default router