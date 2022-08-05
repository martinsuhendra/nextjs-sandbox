import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from '@mui/material';
import React, { FC, ReactNode } from 'react';

interface FormDialogProps {
  open: boolean;
  title?: string;
  onClose?: () => void;
  renderContent: ReactNode;
}

const FormDialog: FC<FormDialogProps> = ({
  open,
  onClose,
  title,
  renderContent,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <Divider />
      <DialogContent>{renderContent}</DialogContent>
      <Divider />
    </Dialog>
  );
};

export default FormDialog;
