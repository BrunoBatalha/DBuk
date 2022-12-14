import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { PostHttp } from '../../app/post/post-http';
import { HttpClient } from '../../core/http/http-client';
import { Home } from '../../screens/home';
import { useThemeStyle } from '../themeContextProvider';
import { getStylesComponent } from './styles';

const Tab = createBottomTabNavigator();

export function NavigatorTab() {
	const styles = useThemeStyle(getStylesComponent);

	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={() => ({
					headerShown: false,
					tabBarActiveTintColor: styles.tabBarActive,
					tabBarStyle: {
						backgroundColor: styles.tabBarStyle.backgroundColor,
						borderTopWidth: styles.tabBarStyle.borderTopWidth
					},
					tabBarIcon: ({ focused, color, size }) => {
						return <MaterialIcon name="timeline" size={36} color={color} />;
					},
				})}
			>
				<Tab.Screen name="Home" component={HomeFactory} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}

function HomeFactory() {
	return <Home postHttp={new PostHttp(new HttpClient())} />
}