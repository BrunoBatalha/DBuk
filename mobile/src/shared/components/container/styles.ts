import { StyleSheet } from "react-native";
import { ThemeType } from "../../../infra/themeContextProvider";

export const getStylesComponent = (theme: ThemeType) => {
	return StyleSheet.create({
		container: {
			height: '100%',
			backgroundColor: theme.colors.primary,
			paddingHorizontal: 16,
			paddingVertical: 24
		}
	})
}