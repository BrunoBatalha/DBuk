import React from 'react';
import { FlatList, Image, Text, View } from "react-native";
import { useThemeStyle } from '../../infra/themeContextProvider';
import { Container } from '../../shared/components/container';
import { getStylesComponent } from './styles';


export function Home() {
	const styles = useThemeStyle(getStylesComponent);

	return (
		<Container>
			<View style={{ flexDirection: 'column' }}>
				<FlatList
					data={[1, 2, 3, 4, 5]}
					// refreshControl
					renderItem={() => (
						<View style={styles.post}>
							<View style={styles.header}>
								<Image style={styles.avatar} source={{ uri: 'https://i.vimeocdn.com/portrait/58832_300x300.jpg' }} />

								<View style={styles.headerInformations}>
									<View style={styles.headerInformationsUser}>
										<Text style={styles.headerUsername}>Jordan Praise</Text>
										<Text style={styles.headerAction}>publicou</Text>
									</View>
									<Text style={styles.headerDatePost}>3 minutos atrás</Text>
								</View>
							</View>

							<Image style={styles.imagePost} source={{ uri: 'https://i.vimeocdn.com/portrait/58832_300x300.jpg' }} />
						</View>
					)}
				></FlatList>
			</View>
		</Container>
	)
}