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

router.post('', validator.office_hours.regist_at_work, (res, req, next) => {
  
})

