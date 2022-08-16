import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Home } from '../../pages/home/Home';
import { colors } from '../../styles/colors';

const Tab = createBottomTabNavigator();

export function NavigatorTab() {
	return (
		<NavigationContainer		>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					headerShown: false,
					tabBarActiveTintColor: colors.tertiary,
					tabBarStyle: {
						backgroundColor: colors.primary,
						borderTopWidth: 0
					},
					tabBarIcon: ({ focused, color, size }) => {
						return <MaterialIcon name="timeline" size={size} color={color} />;
					},
				})}
			>
				<Tab.Screen name="Home" component={Home} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}