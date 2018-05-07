import * as Sequelize from 'sequelize';
interface Params {
  user_no: number,
  employee_no: string,
  employee_name: string,
  password: string,
  entry_date: Date,
  birthday: Date
}
interface Model extends Sequelize.Model<Model, Params> {
  user_no: number,
  employee_no: string,
  employee_name: string,
  password: string,
  entry_date: Date,
  birthday: Date,
  created_at: string,
  updated_at: string
}
interface Instance extends Sequelize.Instance<Params>, Params {
}
