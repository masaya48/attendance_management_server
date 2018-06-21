import * as Sequelize from 'sequelize';
declare namespace TRequestRoute {
  interface Params {
    route_no: number
    request_no: number
    order: number
    confirm_user_no: number
    is_confirmed: boolean
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
export default TRequestRoute
