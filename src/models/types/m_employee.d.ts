import * as Sequelize from 'sequelize';
declare namespace MEmployee {
  interface Params {
    user_no: number
    employee_no: string
    employee_name: string
    password: string
    token: string
    entry_date: Date
    birthday: Date
  }
  interface Instance extends Sequelize.Instance<Params>, Params {
    created_at: string
    updated_at: string
  }
  interface Model extends Sequelize.Model<Instance, Params> {
  }
}
export default MEmployee