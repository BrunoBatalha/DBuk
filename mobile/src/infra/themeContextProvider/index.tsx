import React, { createContext, useContext } from "react";
import { THEME } from "../../styles/theme";

export type ThemeType = typeof THEME
const ThemeContext = createContext<ThemeType>(THEME);

export const useTheme = () => {
	return useContext(ThemeContext);
};
export const useThemedStyles = styles => {
	const theme = useTheme();
	return styles(theme);
};

type Generator<T extends {}> = (theme: ThemeType) => T;
// Creating our custom hook

export const useThemeStyle = <T extends {}>(fn: Generator<T>) => {
	const theme = useTheme();
	const ThemeAwareObject = React.useMemo(() => fn(theme), [fn, theme]);
	return ThemeAwareObject;
};

export function ThemeContextProvider({ children }) {
	return (
		<ThemeContext.Provider value={THEME}>
			{children}
		</ThemeContext.Provider>
	);
};