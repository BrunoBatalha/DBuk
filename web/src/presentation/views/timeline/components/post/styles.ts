import { SxProps, Theme } from '@mui/material';

const Image: SxProps<Theme> = {
  maxWidth: '100%',
  width: '100%',
  margin: (theme) => theme.spacing(3, 0)
};

export const styles = {
  Image
};
