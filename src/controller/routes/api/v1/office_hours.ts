// node_modules
import * as Express from 'express'
import {validationResult} from 'express-validator/check'
// validator
import validator from './../../../validator'
// adapter
import RegistAtWorkRequestAdapter from './../../../adapters/request/office_hours/regist_at_work'
import RegistAtWorkResponseAdapter from './../../../adapters/response/office_hours/regist_at_work'
import CheckAttendanceResponseAdapter from './../../../adapters/response/office_hours/check_attendance'
// service
import OfficeHoursService from './../../../../domain/services/office_hours_service'
// error
import ErrorResponseAdapter from '../../../adapters/response/error_response_adapter';
import ApplicationError from '../../../../libs/errors/application_error';

const router = Express.Router()
const officeHoursServicce = new OfficeHoursService()
const registAtWorkRequestAdapter = new RegistAtWorkRequestAdapter()
const registAtWorkResponseAdapter = new RegistAtWorkResponseAdapter()
const checkAttendanceResponseAdapter = new CheckAttendanceResponseAdapter()
const errorResponseAdapter = new ErrorResponseAdapter()

router.post('/check/attendance', (req: any, res, next) => {
  return officeHoursServicce
    .checkAttendance(req.user.user_no)
    .then(responseDTO => {
      const response = checkAttendanceResponseAdapter.convert(responseDTO)
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
    .registAtWork(registAtWorkRequestAdapter.convert(req))
    .then(responceDTO => {
      const response = registAtWorkResponseAdapter.convert(responceDTO)
      return res.status(response.getStatus()).json(response.getBody())
    })
    .catch((err: ApplicationError) => {
      const response = errorResponseAdapter.convert(err)
      return res.status(response.getStatus()).json(response.getBody())
    })
})

export default router