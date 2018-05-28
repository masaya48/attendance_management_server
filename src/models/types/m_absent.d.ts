import * as Sequelize from 'sequelize';
declare namespace AbsentType {
  interface Params {
    absent_code: number
    absent_type: number
    reason: string
  }
  interface Instance extends Sequelize.Instance<Params>, Params {
  }
  interface Model extends Sequelize.Model<Instance, Params>, Params {
    created_at: string
    updated_at: string
  }
}
export default AbsentType
