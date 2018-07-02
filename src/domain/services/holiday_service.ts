// node_modules
import * as Bluebird from 'bluebird'
import * as moment from 'moment'
//
import { models, Sequelize } from './../../libs/models'
// dto
import * as OfficeHoursRequest from '../dto/request/office_hours_request'
import * as OfficeHoursResponse from '../dto/response/office_hours_response'
// adapter
import ApplicationError from '../../libs/errors/application_error'
import { ErrorCode } from '../../utils/constants/error_code'

const Attendance = models.t_attendance
const Op = Sequelize.Op

/**
 * 出退勤用サービスクラス
 */
class HolidayService {

  public async update() {
    
  }

  // ============================================================================================
  // SQL
  // ============================================================================================

}

export default new HolidayService()
