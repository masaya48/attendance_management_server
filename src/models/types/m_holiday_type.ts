import * as Sequelize from 'sequelize';
declare namespace MHolidayType {
  interface Params {
    holiday_type: string
    name: string
    hours: number
    days: number
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
export default MHolidayType
