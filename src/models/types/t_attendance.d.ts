import * as Sequelize from 'sequelize';
declare namespace TAttendance {
  interface Params {
    attendance_no: number
    user_no: number
    working_date: Date
    start_time: Date
    end_time: Date
    rest_time: Date
    remarks: string
    additional_status: number
    modified_start_time: Date
    modified_end_time: Date
    create_user_no: number
    update_user_no: number
  }
  interface InstanceParams {
    created_at: string
    updated_at: string
  }
  interface Instance extends Sequelize.Instance<InstanceParams & Params>, Params {
  }
  interface Model extends Sequelize.Model<Instance, Params> {
  }
}
export default TAttendance
