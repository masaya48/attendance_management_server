// node_modules
import * as Sequelize from 'sequelize'
// モデル定義(TypeScript用)
import MAbsentType from 'm_absent_type'
import MAbsent from 'm_absent'
import MEmployee from 'm_employee'
import MProject from 'm_project'
import TAbsent from 't_absent'
import TAttendance from 't_attendance'
import TWorkingTime from 't_working_time'
import VExistArrival from 'v_exist_arrival'

interface MyModels extends Sequelize.Models {
  m_absent_type: MAbsentType.Model
  m_absent: MAbsent.Model
  m_employee: MEmployee.Model
  m_project: MProject.Model
  t_absent: TAbsent.Model
  t_attendance: TAttendance.Model
  t_working_time: TWorkingTime.Model
  v_exist_arrival: VExistArrival.Model
}

export default MyModels
