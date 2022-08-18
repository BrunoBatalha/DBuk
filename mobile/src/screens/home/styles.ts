import { StyleSheet } from "react-native";
import { ThemeType } from "../../infra/themeContextProvider";

export const getStylesComponent = (theme: ThemeType) => {
	return StyleSheet.create({
		headerUsername: {
			color: theme.colors.secondary,
			fontWeight: 'bold'
		},
		header: {
			flex: 1,
			flexDirection: 'row',
		},
		headerInformations: {
			flex: 1,
			marginLeft: 12
		},
		headerAction: {
			color: theme.colors.secondary,
			marginLeft: 4
		},
		headerDatePost: {
			color: theme.colors.textInfo
		},
		headerInformationsUser: {
			flexDirection: "row"
		},
		avatar: {
			width: 32,
			height: 32,
			borderRadius: 16,
			resizeMode: "cover",
			alignSelf: 'center',
		},
		imagePost: {
			marginVertical: 20,
			flex: 1,
			width: '100%',
			borderRadius: 12,
			minHeight: 250,
			maxHeight: 400
		},
		post: {
			marginBottom: 12
		}
	});
};
