import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { containerStyles } from "./containerStyle";

export function Container(props) {
	return (
		<SafeAreaView>
			<View style={containerStyles.container}>
				{props.children}
			</View>
		</SafeAreaView>
	)
}