import { Alert, AlertColor, Collapse, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CloseIcon } from '../icons';

type Props = {
  isOpen: boolean;
  message: string;
  type: AlertColor;
  onClose(): void;
};

export function AlertDefault({ isOpen, message, type, onClose }: Props) {
  const { t } = useTranslation();

  return (
    <Collapse in={isOpen}>
      <Alert
        severity={type}
        action={
          <IconButton size="small" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        }
      >
        {t(message)}
      </Alert>
    </Collapse>
  );
}
