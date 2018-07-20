// node_modules
import * as Sequelize from 'sequelize'
// モデル定義(TypeScript用)
import MEmployee from 'm_employee'
import MAbsentType from 'm_absent_type'
import MAbsent from 'm_absent'
import MProject from 'm_project'
// 勤怠管理
import TAttendance from 't_attendance'
import TAbsent from 't_absent'
import TWorkingTime from 't_working_time'
import TModificationRequest from 't_modification_request'
import TRequestRoute from 't_request_route'
import TAttendanceModification from 't_attendance_modification'
// 休暇管理
import MHoliday from 'm_holiday'
import MHolidayType from 'm_holiday_type'
import TOwnHoliday from 't_own_holiday'
import TUsingHoliday from 't_using_holiday'

interface MyModels extends Sequelize.Models {
  m_absent_type: MAbsentType.Model
  m_absent: MAbsent.Model
  m_employee: MEmployee.Model
  m_project: MProject.Model
  t_absent: TAbsent.Model
  t_attendance: TAttendance.Model
  t_working_time: TWorkingTime.Model
  // 修正依頼
  t_modification_request: TModificationRequest.Model
  t_request_route: TRequestRoute.Model
  t_attendance_modification: TAttendanceModification.Model
  // 休暇管理
  m_holiday: MHoliday.Model
  m_holiday_type: MHolidayType.Model
  t_own_holiday: TOwnHoliday.Model
  t_using_holiday: TUsingHoliday.Model
}

export default MyModels
