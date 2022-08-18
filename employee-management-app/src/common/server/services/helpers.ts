import { Employee } from '../../../features/employee/EmployeeList'
import connectMongo from '../database/conn'

import Users from './user'

import { EmployeeInput } from '@/features/employee/EmployeeForm'

const mapEmployee = (employee: Employee) => {
  return { ...employee, _id: employee._id?.toString() || '' }
}

export const loadEmployees = async (): Promise<Employee[]> => {
  await connectMongo()
  const employees: Employee[] = await Users.find().lean()
  return employees.map((employee) => mapEmployee(employee))
}

export const loadEmployee = async (
  employeeId: string | string[]
): Promise<Employee> => {
  await connectMongo()
  const employee = await Users.findById(employeeId).lean().exec()
  return mapEmployee(employee)
}

export const createEmployee = async (formData: EmployeeInput) => {
  const user = await Users.create(formData)
  return user
}

export const updateEmployee = async (
  employeeId: string | string[],
  formData: EmployeeInput
) => {
  const user = await Users.findByIdAndUpdate(employeeId, formData).lean().exec()
  return user
}

export const deleteEmployee = async (employeeId: string | string[]) => {
  const user = await Users.findByIdAndDelete(employeeId).lean().exec()
  return user
}
