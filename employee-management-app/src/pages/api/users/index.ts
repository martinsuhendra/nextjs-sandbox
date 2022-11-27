import {
  BadRequestException,
  NotFoundException,
  RouterBuilder,
} from 'next-api-handler'

import { createEmployee, loadEmployees } from '@/common/server/services/helpers'

// eslint-disable-next-line no-console

const router = new RouterBuilder()

router.get(async () => {
  const employees = await loadEmployees()

  if (!employees) {
    throw new NotFoundException('Error while fetching employees')
  }
  return employees
})

router.post(async (req) => {
  const formData = req.body
  if (!formData) {
    throw new BadRequestException('Formdata not provided')
  }
  const newUser = await createEmployee(formData)
  if (!newUser) {
    throw new NotFoundException('Error while create a new employee')
  }
  return newUser
})

export default router.build()
