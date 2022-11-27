import { SxProps, Theme } from '@mui/material';

const Image: SxProps<Theme> = {
  maxWidth: '100%',
  width: '100%',
  minHeight: '400px',
  margin: (theme) => theme.spacing(2, 0)
};

export const styles = {
  Image
};
