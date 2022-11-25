import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeStyle } from "../../../infra/themeContextProvider";
import { getStylesComponent } from "./styles";

export function Container(props) {

	const styles = useThemeStyle(getStylesComponent)

	return (
		<SafeAreaView>
			<View style={styles.container}>
				{props.children}
			</View>
		</SafeAreaView>
	)
}