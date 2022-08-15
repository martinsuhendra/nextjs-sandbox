import React, { FC, ReactNode } from 'react'

import { Dialog, DialogContent, DialogTitle, Divider } from '@mui/material'
import { useDispatch } from 'react-redux'

import useAppSelector from '@/common/hooks/useAppSelector'
import { toggleChangeAction } from '@/redux/rootReducer'

interface FormDialogProps {
  title?: string
  children: ReactNode
}

const FormDialog: FC<FormDialogProps> = ({ title, children }) => {
  const dispatch = useDispatch()
  const showForm = useAppSelector((state) => state.app.client.toggleForm)

  const toggleForm = () => {
    dispatch(toggleChangeAction())
  }

  return (
    <Dialog open={showForm} onClose={toggleForm}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <Divider />
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}

export default FormDialog
