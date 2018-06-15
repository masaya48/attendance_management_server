import {Request} from 'express'
import MEmployee from 'm_employee'

/**
 * tokenログイン後の共通リクエスト
 */
interface MyLoginRequest extends Request {
  user: MEmployee.Instance
}
export default MyLoginRequest