// node_modules
import * as Express from 'express'
import {validationResult} from 'express-validator/check'
// validator
import validator from './../../../validator'
// adapter
import RegistAtWorkRequestAdapter from './../../../adapters/request/office_hours/regist_at_work'
// service
import OfficeHoursService from './../../../../domain/services/office_hours_service'
// error
import ErrorResponseAdapter from '../../../adapters/response/error_response_adapter';
import ApplicationError from '../../../../libs/errors/application_error';

const router = Express.Router()
const officeHoursServicce = new OfficeHoursService()
const registAtWorkRequestAdapter = new RegistAtWorkRequestAdapter()
const errorResponseAdapter = new ErrorResponseAdapter()

router.post('/regist/at_work', validator.office_hours.regist_at_work, (req, res, next) => {
  // バリデーションチェック
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorResponse = validator.getValidateErrorResponse(errors)
    return res.status(errorResponse.getStatus()).json(errorResponse.getBody())
  }
  console.log('aaaa:' + req.user)

  return officeHoursServicce
    .atWork(registAtWorkRequestAdapter.convert(req))
    .then(() => {
      return res.status(200).json({status: 200, message: '成功'})
    })
    .catch((err: ApplicationError) => {
      const response = errorResponseAdapter.convert(err)
      return res.status(response.getStatus()).json(response.getBody())
    })
})

export default router