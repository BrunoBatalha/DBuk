import { SxProps, Theme } from '@mui/material';

export const ContainerSx: SxProps<Theme> = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: (theme) => theme.spacing(8, 4),
  height: '100vh',
  position: 'relative'
};
