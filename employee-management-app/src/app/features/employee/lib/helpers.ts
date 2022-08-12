import connectMongo from '../../../../common/server/database/conn'
import Users from '../../../../common/server/services/user'
import { Employee } from '../EmployeeList'

export const loadEmployees = async (): Promise<Employee[] | undefined> => {
  await connectMongo()
  const employees: Employee[] | null = await Users.find({})

  return JSON.parse(JSON.stringify(employees))
}

export const loadEmployee = async (
  employeeId: string
): Promise<Employee | undefined> => {
  await connectMongo()
  const employee: Employee | null = await Users.findById(employeeId)

  return JSON.parse(JSON.stringify(employee))
}
