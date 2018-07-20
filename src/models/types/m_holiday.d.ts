import * as Sequelize from 'sequelize';
declare namespace MHoliday {
  interface Params {
    holiday_code: number
    holiday_type: string
    name: string
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
export default MHoliday
