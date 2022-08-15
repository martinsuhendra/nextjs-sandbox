import connectMongo from '../../../../common/server/database/conn'
import Users from '../../../../common/server/services/user'
import { Employee } from '../EmployeeList'

export const loadEmployees = async (): Promise<Employee[] | undefined> => {
  await connectMongo()
  const employees = await Users.find({}).lean().exec()
  return employees as Employee[]
}

export const loadEmployee = async (
  employeeId: string
): Promise<Employee | undefined> => {
  await connectMongo()
  const employee = await Users.findById(employeeId).lean().exec()
  return JSON.parse(JSON.stringify(employee))
}
