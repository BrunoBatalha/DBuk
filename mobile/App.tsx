import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigatorTab } from './src/infra/navigatorTab/NavigatorTab';
import { colors } from './src/styles/colors';


export default function App() {
	return (
		<SafeAreaProvider>
			<StatusBar backgroundColor={colors.primary} style='light' />
			<NavigatorTab />
		</SafeAreaProvider>
	);
}