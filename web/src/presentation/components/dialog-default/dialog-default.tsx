import { AppBar, Box, Button, IconButton, Slide, Toolbar, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { TransitionProps } from '@mui/material/transitions';
import { CloseIcon } from 'presentation/components/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  onCancel(): void;
  onConfirm(): void;
  isOpen: boolean;
  children: React.ReactNode;
};

export function DialogDefault({ children, onCancel, onConfirm, isOpen }: Props): React.ReactElement {
  const { t } = useTranslation();

  return (
    <Dialog fullScreen open={isOpen} TransitionComponent={Transition}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onCancel}>
            <CloseIcon />
          </IconButton>

          <Typography sx={{ ml: 2, flex: 1 }} variant="h6">
            {t('new_publish.edit_image')}
          </Typography>

          <Button autoFocus color="inherit" onClick={onConfirm} data-testid="btn-save-crop-image">
            {t('new_publish.save')}
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: (theme) => theme.spacing(4) }}>{children}</Box>
    </Dialog>
  );
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
