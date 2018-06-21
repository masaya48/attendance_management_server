import * as Sequelize from 'sequelize';
declare namespace TModificationRequest {
  interface Params {
    request_no: number
    request_user_no: number
    subject: string
    reason: string
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
export default TModificationRequest
