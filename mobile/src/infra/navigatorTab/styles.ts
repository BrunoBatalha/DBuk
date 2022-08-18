import { ThemeType } from "../themeContextProvider"

export const getStylesComponent = (theme: ThemeType) => {
	return {
		tabBarActive: theme.colors.tertiary,
		tabBarStyle: {
			backgroundColor: theme.colors.primary,
			borderTopWidth: 0
		}
	}
}