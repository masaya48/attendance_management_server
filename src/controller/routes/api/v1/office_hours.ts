// node_modules
import * as Express from 'express'
import {validationResult} from 'express-validator/check'
// validator
import validator from './../../../validator'
// adapter
import officeHoursRequestAdapter from './../../../adapters/request/office_hours'
import officeHoursResponseAdapter from './../../../adapters/response/office_hours'
import {} from '../../../adapters/response/office_hours'
// service
import OfficeHoursService from './../../../../domain/services/office_hours_service'
// error
import ErrorResponseAdapter from '../../../adapters/response/error_response_adapter';
import ApplicationError from '../../../../libs/errors/application_error';

const router = Express.Router()
const officeHoursServicce = new OfficeHoursService()
// const registAtWorkRequestAdapter = new RegistAtWorkRequestAdapter()
// const registAtWorkResponseAdapter = new RegistAtWorkResponseAdapter()
// const checkAttendanceResponseAdapter = new CheckAttendanceResponseAdapter()
const errorResponseAdapter = new ErrorResponseAdapter()

router.post('/check/attendance', (req: any, res, next) => {
  return officeHoursServicce
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

router.post('/regist/at_work', validator.office_hours.regist_at_work, (req, res, next) => {
  // バリデーションチェック
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorResponse = validator.getValidateErrorResponse(errors)
    return res.status(errorResponse.getStatus()).json(errorResponse.getBody())
  }

  return officeHoursServicce
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

router.post('/regist/leave_work', validator.office_hours.regist_leave_work, (req, res, next) => {
  // バリデーションチェック
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorResponse = validator.getValidateErrorResponse(errors)
    return res.status(errorResponse.getStatus()).json(errorResponse.getBody())
  }

  return officeHoursServicce
    .registLeaveWork(officeHoursRequestAdapter.regist.leaveWorkConvert(req))
    .then(responceDTO => {
      const response = officeHoursResponseAdapter.regist.leaveWorkConvert(responceDTO)
      console.log(response)
      return res.status(response.getStatus()).json(response.getBody())
    })
    .catch((err: ApplicationError) => {
      const response = errorResponseAdapter.convert(err)
      return res.status(response.getStatus()).json(response.getBody())
    })
})

export default router