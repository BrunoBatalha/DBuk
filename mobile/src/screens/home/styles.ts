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
			marginBottom: 26
		},
		footerPost: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			paddingBottom: 10,
			borderBottomColor: theme.colors.textInfo,
			borderBottomWidth: .5,
			position: 'relative'
		},
		footerIconThumb: {
			color: '#fff',
			backgroundColor: '#0082FD',
			width: 22,
			height: 22,
			borderRadius: 10,
			alignContent: 'center',
			alignItems: 'center',
			textAlign: 'center',
			textAlignVertical: 'center',
			borderColor: '#fff',
			borderWidth: 2
		},
		footerIconFavorite: {
			color: '#fff',
			backgroundColor: '#F14538',
			width: 22,
			height: 22,
			borderRadius: 10,
			alignContent: 'center',
			alignItems: 'center',
			textAlign: 'center',
			textAlignVertical: 'center',
			borderColor: '#fff',
			borderWidth: 2,
			position: 'absolute',
			left: 18
		},
		footerReactions: {
			flexDirection: 'row',
		},
		footerReactionsNumber: {
			marginLeft: 24,
			color: theme.colors.secondary,
			alignSelf: 'center'
		},
		footerCommentsInfo: {
			color: theme.colors.textInfo,
			alignSelf: 'center'
		},
		actionsButton: {
			flex: 1,
			minHeight: 40,
			justifyContent: 'center',
			flexDirection: 'row',
			alignItems: 'center',
		},
		actionsPost: {
			flexDirection: 'row',
		},
		actionsIcon: {
			color: theme.colors.secondary,
			marginRight: 12,
			fontSize: 18
		},
		actionsText: {
			color: theme.colors.secondary,
			fontSize: 18
		}
	});
};
