import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigatorTab } from "../navigatorTab";
import { ThemeContextProvider, useThemeStyle } from "../themeContextProvider";
import { getStylesComponent } from "./styles";

export function MainWrapper() {
	const styles = useThemeStyle(getStylesComponent);

	return (
		<SafeAreaProvider>
			<StatusBar backgroundColor={styles.background} style='light' />
			<ThemeContextProvider>
				<NavigatorTab />
			</ThemeContextProvider>
		</SafeAreaProvider>
	)
} 