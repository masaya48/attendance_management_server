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

const MHoliday = models.m_holiday
const MHolidayType = models.m_holiday_type
const TOwnHoliday = models.t_own_holiday
const TUsingHoliday = models.t_using_holiday
const Op = Sequelize.Op

/**
 * 休暇管理用サービスクラス
 */
class HolidayService {

  /**
   * 休暇取得情報登録
   */
  public saveHoliday(userNo: number, usingDate: Date, holidayCode: number) {
    
  }

  /**
   * 休暇情報変更
   */
  public updateHoliday(userNo:number, usingHoildayId: number) {
  }

  /**
   * 休暇付与
   */
  public grantHoliday() {

  }

  /**
   * 休暇情報削除
   */
  public deleteHoliday(userNo: number, id: number) {
  }

  /**
   * 休暇残数チェック
   * 
   * @param userNo
   * @param holidayCode
   */
  public check(userNo: number, holidayCode: number) {

  }

  // ============================================================================================
  // SQL
  // ============================================================================================
  private async save(userNo: number, usingDate: Date, holidayCode: number) {
    const usingHoliday = await TUsingHoliday.create({
      user_no: userNo,
      holiday_code: holidayCode,
      using_date: usingDate,
      create_user_no: userNo,
      update_user_no: userNo
    })

    return usingHoliday
  }

  private async update(userNo: number, usingHolidayId: number) {
    const usingHoliday = await TUsingHoliday.find({
      where: {
        id: usingHolidayId
      }
    })

    usingHoliday.update({
    })
    return usingHoliday
  }

  private async checkRemainingHolidays(userNo: number) {
    const ownHoliday = await TOwnHoliday.create
    return ownHoliday
  }

}

export default new HolidayService()
