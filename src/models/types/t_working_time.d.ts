import * as Sequelize from 'sequelize';
declare namespace TWorkingTime {
  interface Params {
    working_no: number
    attendance_no: number
    project_code: number
    create_user_no: number
    update_user_no: number
  }
  interface Instance extends Sequelize.Instance<Params>, Params {
  }
  interface Model extends Sequelize.Model<Instance, Params>, Params {
    created_at: string
    updated_at: string
  }
}
export default TWorkingTime
