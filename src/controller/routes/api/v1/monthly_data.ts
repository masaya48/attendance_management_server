// node_modules
import * as Express from 'express'
import {validationResult} from 'express-validator/check'
/* import * as bcrypt from 'bcrypt' */
// validator
import validator from './../../../validator'
// adapters
import MonthlyDataGetRequestAdapter from './../../../adapters/request/monthly_data/get_monthly_data_adapter'
import MonthlyDataGetResponseAdapter from './../../../adapters/response/monthly_data/get_monthly_data_response_adapter'
// sevices
import monthlyDataGetServiceervice from './../../../../domain/services/monthly_data_get_service'
// error
import ErrorResponseAdapter from '../../../adapters/response/error_response_adapter';
import ApplicationError from '../../../../libs/errors/application_error';

// ========================================================================================
// 処理開始
// ========================================================================================
const router = Express.Router()

const monthlyDataGetService = new monthlyDataGetServiceervice()
const monthlyDataGetRequestAdapter = new MonthlyDataGetRequestAdapter()
const monthlyDataGetResponseAdapter = new MonthlyDataGetResponseAdapter()
const errorResponseAdapter = new ErrorResponseAdapter()
/* monthly_data get */
router.post('/get', (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  // バリデーションチェック
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorResponse = validator.getValidateErrorResponse(errors)
    return res.status(errorResponse.getStatus()).json(errorResponse.getBody())
  }

  // ログイン認証処理
  return monthlyDataGetService
    .getMonthlyData(monthlyDataGetRequestAdapter.convert(req))
    .then(( responseDTO ) => {
      const response = monthlyDataGetResponseAdapter.convert(responseDTO)
      return res.status(response.getStatus()).json(response.getBody())
    })
    .catch(( err: ApplicationError ) => {
      const errorResponse = errorResponseAdapter.convert(err)
      return res.status(errorResponse.getStatus()).json(errorResponse.getBody())
    })
})

export default router
