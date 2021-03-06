import * as Sequelize from 'sequelize';
declare namespace MProject {
  interface Params {
    project_code?: number
    entry_no?: string
    project_name?: string
    project_short_name?: string
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
export default MProject
