import { BottomNavigation, BottomNavigationAction, Box, Paper } from '@mui/material';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { NewspaperIcon, PostAddIcon } from 'shared/icons';
import { styles } from './styles';

export function BottomNavigationMain(): JSX.Element {
	const navigate = useNavigate();
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
					<BottomNavigationAction value={BottomNavigationOption.Timeline} label="Timeline" icon={<NewspaperIcon />} />
					<BottomNavigationAction value={BottomNavigationOption.NewPost} label="New Post" icon={<PostAddIcon />} />
				</BottomNavigation>
			</Paper>
		</>
	);
}

enum BottomNavigationOption {
	Timeline = '/',
	NewPost = '/publish-post'
}
