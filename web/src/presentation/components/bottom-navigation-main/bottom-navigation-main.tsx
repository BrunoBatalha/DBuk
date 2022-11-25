import { BottomNavigation, BottomNavigationAction, Box, Paper } from '@mui/material';
import { NewspaperIcon, PostAddIcon } from 'presentation/components/icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router-dom';
import { styles } from './styles';

export function BottomNavigationMain(): JSX.Element {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [currentMenu, setCurrentMenu] = useState(BottomNavigationOption.Timeline);

  return (
    <>
      <Box sx={styles.Outlet}>
        <Outlet />
      </Box>

      <Paper sx={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} elevation={2}>
        <BottomNavigation
          showLabels
          value={currentMenu}
          onChange={(_event, newValue: BottomNavigationOption): void => {
            setCurrentMenu(newValue);
            navigate(newValue);
          }}
        >
          <BottomNavigationAction
            value={BottomNavigationOption.Timeline}
            label={t('bar_navigation.timeline')}
            icon={<NewspaperIcon />}
          />
          <BottomNavigationAction
            value={BottomNavigationOption.NewPost}
            label={t('bar_navigation.new_publish')}
            icon={<PostAddIcon />}
            data-testId="menu-option-publish"
          />
        </BottomNavigation>
      </Paper>
    </>
  );
}

enum BottomNavigationOption {
  Timeline = '/',
  NewPost = '/publish-post'
}
