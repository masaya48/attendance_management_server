import * as Sequelize from 'sequelize';
declare namespace TOwnHoliday {
  interface Params {
    id?: number
    user_no: number
    holiday_code: number
    own_holidays: number
    start_date: Date
    end_date: Date
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
export default TOwnHoliday
