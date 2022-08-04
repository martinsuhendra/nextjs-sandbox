import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import { IconButton } from '@mui/material';
import { CloseButtonProps, ToastContainer } from 'react-toastify';

const CloseButton = ({ closeToast }: CloseButtonProps): JSX.Element => (
  <IconButton
    size="small"
    onClick={closeToast}
    disableRipple
    disableTouchRipple
    disableFocusRipple
    sx={{ alignSelf: 'center' }}>
    <Icon icon={closeFill} />
  </IconButton>
);

const ToastProvider = (): JSX.Element => (
  <ToastContainer closeButton={CloseButton} />
);

export default ToastProvider;
