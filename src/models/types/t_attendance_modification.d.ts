import * as Sequelize from 'sequelize';
declare namespace TAttendanceModification {
  interface Params {
    id?: number
    request_no?: number
    attendance_no?: number
    is_start_time?: boolean
    modified_time?: Date
    create_user_no?: number
    update_user_no?: number
  }
  interface InstanceParams {
    created_at?: string
    updated_at?: string
  }
  interface Instance extends Sequelize.Instance<InstanceParams & Params>, Params {
  }
  interface Model extends Sequelize.Model<Instance, Params> {
  }
}
export default TAttendanceModification
