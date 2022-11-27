import React from 'react'

import { ReorderOutlined, SettingsOutlined } from '@mui/icons-material'
import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import {
  DraggableProvidedDraggableProps,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd'

import { Employee } from '@/features/employee/EmployeeList'

interface EmployeeListItemProps {
  employee: Employee
  dragSnapshot: DraggableStateSnapshot
  draggableProps: DraggableProvidedDraggableProps
  dragInnerRef: (element?: HTMLElement | null | undefined) => void
}

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggableProvidedDraggableProps['style']
) => ({
  // styles we need to apply on draggables
  ...draggableStyle,

  ...(isDragging && {
    background: 'rgb(235,235,235)',
  }),
})

const EmployeeListItem = ({
  employee,
  dragSnapshot,
  draggableProps,
  dragInnerRef,
  ...props
}: EmployeeListItemProps) => {
  const theme = useTheme()

  return (
    <ListItem
      {...props}
      {...draggableProps}
      ref={dragInnerRef}
      sx={{ boxShadow: theme.shadows[1], mb: 3 }}
      style={getItemStyle(dragSnapshot.isDragging, draggableProps.style)}
    >
      <ListItemIcon>
        <ReorderOutlined />
      </ListItemIcon>

      <ListItemAvatar>
        <Avatar alt={employee.firstName} src={employee.avatar} />
      </ListItemAvatar>
      <ListItemText primary={employee.firstName} />
      {!dragSnapshot.isDragging && (
        <Box>
          <ListItemSecondaryAction onClick={() => alert('hello')}>
            <SettingsOutlined />
          </ListItemSecondaryAction>
        </Box>
      )}
    </ListItem>
  )
}

export default EmployeeListItem
