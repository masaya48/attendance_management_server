import * as Sequelize from 'sequelize';
declare namespace VExistArrival {
  interface Params {
    user_no: number
    attendance_no: number
    count: number
  }
  interface InstanceParams {
  }
  interface Instance extends Sequelize.Instance<InstanceParams & Params>, Params {
  }
  interface Model extends Sequelize.Model<Instance, Params> {
  }
}
export default VExistArrival
