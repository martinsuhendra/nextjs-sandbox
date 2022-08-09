import { Dialog, DialogContent, DialogTitle, Divider } from '@mui/material';
import React, { FC, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { toggleChangeAction } from '@/app/redux/rootReducer';
import useAppSelector from '@/common/hooks/useAppSelector';

interface FormDialogProps {
  title?: string;
  children: ReactNode;
}

const FormDialog: FC<FormDialogProps> = ({ title, children }) => {
  const dispatch = useDispatch();
  const showForm = useAppSelector((state) => state.app.client.toggleForm);

  const toggleForm = () => {
    dispatch(toggleChangeAction());
  };

  return (
    <Dialog open={showForm} onClose={toggleForm}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <Divider />
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default FormDialog;
