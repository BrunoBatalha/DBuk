import { SxProps, Theme } from '@mui/material';

const Avatar: SxProps<Theme> = {
  height: '48px',
  width: '48px'
};

const Username: SxProps<Theme> = {
  fontWeight: (theme) => theme.typography.fontWeightBold,
  marginRight: (theme) => theme.spacing(1)
};

const DatePublished: SxProps<Theme> = {
  fontSize: (theme) => theme.typography.subtitle2
};

export const styles = {
  Avatar,
  Username,
  DatePublished
};
