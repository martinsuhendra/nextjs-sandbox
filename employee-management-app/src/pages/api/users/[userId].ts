import {
  BadRequestException,
  NotFoundException,
  RouterBuilder,
} from 'next-api-handler'

import {
  deleteEmployee,
  loadEmployee,
  updateEmployee,
} from '@/common/server/services/helpers'

const router = new RouterBuilder()

router.get(async (req, res) => {
  if (!req.query.userId) {
    throw new BadRequestException('User not selected!')
  }

  const employeeId = req.query.userId

  const employee = await loadEmployee(employeeId)

  if (!employee) {
    throw new NotFoundException('employee not found!')
  }
  return res.status(200).json({ success: true, employee })
})

router.put(async (req, res) => {
  if (!req.query.userId) {
    throw new BadRequestException('User not selected!')
  }

  if (!req.body) {
    throw new BadRequestException('Form data not provided')
  }

  const updatedEmployee = await updateEmployee(req.query.userId, req.body)

  if (!updatedEmployee) {
    throw new NotFoundException('User not found!')
  }

  return res.status(200).json(updatedEmployee)
})

router.delete(async (req, res) => {
  if (!req.query.userId) {
    throw new BadRequestException('User not selected!')
  }

  const deletedEmployee = await deleteEmployee(req.query.userId)

  if (!deletedEmployee) {
    throw new NotFoundException('User not found!')
  }

  return res.status(200).json({ success: true, deleteEmployee })
})

export default router.build()
