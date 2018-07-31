import * as Sequelize from 'sequelize';
declare namespace TOwnHoliday {
  interface Params {
    id?: number
    user_no?: number
    holiday_code?: number
    using_date?: Date
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
export default TOwnHoliday
