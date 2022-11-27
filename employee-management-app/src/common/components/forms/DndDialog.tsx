import React, { useEffect, useState } from 'react'

import { faker } from '@faker-js/faker'
import { List } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  DragUpdate,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
  DropResult,
} from 'react-beautiful-dnd'

import EmployeeListItem from './EmployeeListItem'

import { Statuses } from '@/features/employee/EmployeeForm'
import { Employee } from '@/features/employee/EmployeeList'

const queryAttr = 'data-rbd-drag-handle-draggable-id'
const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'rgba(175, 167, 227,0.1)' : 'white',
})
interface PlaceholderProps {
  clientY: number
  clientX: number
  clientHeight: number
  clientWidth: number
}

const DndDialog = ({
  open,
  onClose,
}: {
  open: boolean
  onClose: VoidFunction
}) => {
  const [employees, setEmployees] = useState<Employee[] | []>([])
  const [placeholderProps, setPlaceholderProps] =
    useState<PlaceholderProps | null>(null)

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

  const reorder = (list: Employee[], startIndex: number, endIndex: number) => {
    const temp = [...list]
    const [removed] = temp.splice(startIndex, 1)
    temp.splice(endIndex, 0, removed)

    return temp
  }

  const onDragUpdate = (update: DragUpdate) => {
    const { destination, draggableId } = update
    if (!destination) return

    const destinationIndex = destination.index

    const domQuery = `[${queryAttr}='${draggableId}']`
    const draggedDOM = document.querySelector(domQuery)

    if (!draggedDOM) return

    const { clientHeight, clientWidth, parentNode } = draggedDOM

    const clientY =
      Number.parseFloat(
        window.getComputedStyle(parentNode as Element).paddingTop
      ) +
      [...parentNode?.children]
        .slice(0, destinationIndex)
        .reduce((total, curr) => {
          const style = curr.currentStyle || window.getComputedStyle(curr)
          const marginBottom = Number.parseFloat(style.marginBottom)
          return total + curr.clientHeight + marginBottom
        }, 0)

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: Number.parseFloat(
        window.getComputedStyle(parentNode as Element).paddingLeft
      ),
    })
  }

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result

    if (!destination) return
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return

    const items = reorder(employees, source.index, destination.index)

    setPlaceholderProps(null)
    setEmployees(items)
  }

  useEffect(() => {
    generatePeople()
  }, [])

  return (
    <Dialog maxWidth="md" fullWidth open={open} onClose={onClose}>
      <DialogTitle>Employee List Drag & Drop</DialogTitle>
      <DialogContent>
        <DragDropContext onDragEnd={handleDragEnd} onDragUpdate={onDragUpdate}>
          <Droppable droppableId="droppable" direction="vertical">
            {(
              { droppableProps, innerRef, placeholder }: DroppableProvided,
              dropSnapshot: DroppableStateSnapshot
            ) => (
              <List
                style={getListStyle(dropSnapshot.isDraggingOver)}
                {...droppableProps}
                ref={innerRef}
              >
                {employees.map((employee: Employee, i) => (
                  <Draggable
                    key={employee._id}
                    draggableId={employee._id}
                    index={i}
                  >
                    {(
                      {
                        draggableProps,
                        innerRef: dragInnerRef,
                        dragHandleProps,
                      }: DraggableProvided,
                      dragSnapshot: DraggableStateSnapshot
                    ) => (
                      <EmployeeListItem
                        draggableProps={draggableProps}
                        employee={employee}
                        dragInnerRef={dragInnerRef}
                        dragSnapshot={dragSnapshot}
                        {...dragHandleProps}
                      />
                    )}
                  </Draggable>
                ))}
                {placeholder}
                <div
                  style={{
                    position: 'absolute',
                    top: placeholderProps?.clientY,
                    left: placeholderProps?.clientX,
                    height: placeholderProps?.clientHeight,
                    width: placeholderProps?.clientWidth,
                    border: '2px dashed #3D0099',
                    background: '#AFA7E3',
                  }}
                />
              </List>
            )}
          </Droppable>
        </DragDropContext>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DndDialog
