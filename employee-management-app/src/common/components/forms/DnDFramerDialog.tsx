import React, { useEffect, useState } from 'react'

import { faker } from '@faker-js/faker'
import { DialogContent, DialogTitle, List } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import { Reorder } from 'framer-motion'

import EmployeeListItem from './EmployeeListItem'

import { Statuses } from '@/features/employee/EmployeeForm'
import { Employee } from '@/features/employee/EmployeeList'

const DnDFramerDialog = ({
  open,
  onClose,
}: {
  open: boolean
  onClose: VoidFunction
}) => {
  const [employees, setEmployees] = useState<Employee[] | []>([])

  const generatePeople = () => {
    const people = []

    for (let index = 0; index < 5; index++) {
      const randomEmployee: Employee = {
        _id: faker.phone.imei().toString(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        salary: faker.datatype.number({ min: 1000, max: 10000 }),
        birthday: faker.date.birthdate(),
        avatar: faker.image.avatar(),
        status: Statuses.ACTIVE,
      }
      people.push(randomEmployee)
    }
    setEmployees(people)
  }

  useEffect(() => {
    generatePeople()
  }, [])

  return (
    <Dialog maxWidth="md" fullWidth open={open} onClose={onClose}>
      <DialogTitle>Employee Framer Motion List Drag & Drop</DialogTitle>
      <DialogContent>
        <Reorder.Group axis="y" values={employees} onReorder={setEmployees}>
          <List>
            {employees.map((employee: Employee) => (
              <Reorder.Item
                value={employee}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={employee._id}
              >
                <EmployeeListItem employee={employee} />
              </Reorder.Item>
            ))}
          </List>
        </Reorder.Group>
      </DialogContent>
    </Dialog>
  )
}

export default DnDFramerDialog
