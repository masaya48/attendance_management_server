import models from './../libs/models'
import * as jwt from 'jsonwebtoken'

const getUser = async (token: string) => {
  const Employee = models.m_employee
  const payload = await jwt.decode(token, {json: true}) as {[key: string]: any}
  const user_no = payload.user_no
  const employee = await Employee.find({where: {user_no: user_no}})
  return employee
}