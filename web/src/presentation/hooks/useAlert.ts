import { AlertColor } from '@mui/material';
import { useState } from 'react';

type Props = {
  isOpen: boolean;
  type: AlertColor;
  message: string;
};

export function useAlert(props: Props = { isOpen: false, message: '', type: 'success' }) {
  const [alert, setAlert] = useState<Props>({ isOpen: props.isOpen, type: props.type, message: props.message });

  return {
    alert,
    setAlert
  };
}
