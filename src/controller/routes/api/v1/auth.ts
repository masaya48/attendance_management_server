// node_modules
import * as Express from 'express'
import {validationResult} from 'express-validator/check'
/* import * as bcrypt from 'bcrypt' */
// validator
import validator from './../../../validator'
// adapters
import loginRequestAdapter from './../../../adapters/request/login_request_adapter'
import loginResponseAdapter from './../../../adapters/response/login_response_adapter'
// sevices
import authenticateService from './../../../../domain/services/authenticate_service'
// error
import errorResponseAdapter from '../../../adapters/response/error_response_adapter';
import ApplicationError from '../../../../libs/errors/application_error';

// ========================================================================================
// 処理開始
// ========================================================================================
const router = Express.Router()

/* ログイン認証 */
router.post('/login', validator.login, (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  // バリデーションチェック
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorResponse = validator.getValidateErrorResponse(errors)
    return res.status(errorResponse.getStatus()).json(errorResponse.getBody())
  }

  // ログイン認証処理
  return authenticateService
    .login(loginRequestAdapter.convert(req))
    .then(( requestDto ) => {
      const response = loginResponseAdapter.convert(requestDto)
      return res.status(response.getStatus()).json(response.getBody())
    })
    .catch(( err: ApplicationError ) => {
      const errorResponse = errorResponseAdapter.convert(err)
      return res.status(errorResponse.getStatus()).json(errorResponse.getBody())
    })
})

export default router
