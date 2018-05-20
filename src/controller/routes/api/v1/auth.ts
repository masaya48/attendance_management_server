// node_modules
import * as Express from 'express'
import {validationResult} from 'express-validator/check'
/* import * as bcrypt from 'bcrypt' */
// validator
import validator from './../../../validator'
// dto
import ErrorResponseDTO from './../../../../domain/dto/response/error_response_dto'
// adapters
import LoginRequestAdapter from './../../../adapters/request/login_request_adapter'
import LoginResponseAdapter from './../../../adapters/response/login_response_adapter'
// sevices
import AuthenticateService from './../../../../domain/services/authenticate_service'

// ========================================================================================
// 処理開始
// ========================================================================================
const router = Express.Router()

const authenticateService = new AuthenticateService()
const loginRequestAdapter = new LoginRequestAdapter()
const loginResponseAdapter = new LoginResponseAdapter()

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
    .then(
      ( requestDto ) => {
        console.log('test')
        const response = loginResponseAdapter.convert(requestDto)
        return res.status(response.getStatus()).json(response.getBody())
      },
      ( err: ErrorResponseDTO ) => {
        return res.status(err.getStatus()).json({message: err.getMessage()})
      }
    )
})

export default router
