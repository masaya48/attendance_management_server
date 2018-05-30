import * as Sequelize from 'sequelize'
declare namespace MAbsentType {
  interface Params {
    absent_type: number
    absent_name: string
  }
  interface InstanceParams extends Params {
    created_at: string
    updated_at: string
  }
  interface Instance extends Sequelize.Instance<InstanceParams>, InstanceParams {
  }
  interface Model extends Sequelize.Model<Instance, Params> {
  }
}
export default MAbsentType
