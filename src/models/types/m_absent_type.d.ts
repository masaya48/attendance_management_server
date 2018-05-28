import * as Sequelize from 'sequelize';
declare namespace Absent {
  interface Params {
    absent_type: number,
    absent_name: string
  }
  interface Instance extends Sequelize.Instance<Params>, Params {
  }
  interface Model extends Sequelize.Model<Instance, Params>, Params {
    created_at: string,
    updated_at: string
  }
}
export default Absent
