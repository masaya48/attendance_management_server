import * as Sequelize from 'sequelize';
declare namespace TAbsent {
  interface Params {
    reason_no: number
    attendance_no: number
    absent_code: number
    reason: string
    create_user_no: number
    update_user_no: number
  }
  interface Instance extends Sequelize.Instance<Params>, Params {
    created_at: string
    updated_at: string
  }
  interface Model extends Sequelize.Model<Instance, Params> {
  }
}
export default TAbsent
