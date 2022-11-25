import { ThemeType } from "../themeContextProvider";

export const getStylesComponent = (theme: ThemeType) => {
	return {
		background: theme.colors.primary
	}
}