import * as Sequelize from 'sequelize';
declare namespace MAbsentType {
  interface Params {
    absent_code?: number
    absent_type?: number
    reason?: string
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
export default MAbsentType
