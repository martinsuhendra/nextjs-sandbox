import { BASE_URL } from '../employeeApi'
import { Employee } from '../EmployeeList'

export const loadEmployees = async (): Promise<Employee[]> => {
  const res = await fetch(`${BASE_URL}/api/users`)
  const employees = await res.json()

  return employees
}

export const loadEmployee = async (employeeId: string): Promise<Employee> => {
  const res = await fetch(`${BASE_URL}/api/users/${employeeId}`)
  const employee = await res.json()

  return employee
}
