import { BottomNavigation, BottomNavigationAction, Box, Paper } from '@mui/material';
import { NewspaperIcon, PostAddIcon } from 'presentation/components/icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { styles } from './styles';

enum BottomNavigationOption {
  Timeline = '/',
  NewPost = '/publish-post'
}

export function BottomNavigationMain(): JSX.Element {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [currentMenu, setCurrentMenu] = useState<BottomNavigationOption | null>(null);

  return (
    <>
      <Box sx={styles.Outlet}>
        <Outlet />
      </Box>

      <Paper sx={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} elevation={2}>
        <BottomNavigation
          showLabels
          value={currentMenu || pathname}
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
            data-testid="menu-option-publish"
          />
        </BottomNavigation>
      </Paper>
    </>
  );
}
