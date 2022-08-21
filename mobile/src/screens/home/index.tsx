import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useThemeStyle } from '../../infra/themeContextProvider';
import { Container } from '../../shared/components/container';
import { MaterialIcon } from '../../shared/importIcons';
import { getStylesComponent } from './styles';


export function Home() {
	const styles = useThemeStyle(getStylesComponent);

	return (
		<Container>
			<FlatList
				style={{ paddingTop: 24 }}
				showsVerticalScrollIndicator={false}
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

						<View style={styles.footerPost}>
							<View style={styles.footerReactions}>
								<MaterialIcon name='thumb-up' style={styles.footerIconThumb} />
								<MaterialIcon name='favorite' style={styles.footerIconFavorite} />
								<Text style={styles.footerReactionsNumber}>400</Text>
							</View>

							<TouchableOpacity>
								<Text style={styles.footerCommentsInfo}>122 Comments</Text>
							</TouchableOpacity>
						</View>

						<View style={styles.actionsPost}>
							<TouchableOpacity style={styles.actionsButton} activeOpacity={.7}>
								<MaterialIcon name='thumb-up-off-alt' style={styles.actionsIcon} />
								<Text style={styles.actionsText}>Like</Text>
							</TouchableOpacity>

							<TouchableOpacity style={styles.actionsButton} activeOpacity={.7}>
								<MaterialIcon name='chat-bubble-outline' style={styles.actionsIcon} />
								<Text style={styles.actionsText}>Comment</Text>
							</TouchableOpacity>
						</View>
					</View>

				)}
			></FlatList>
		</Container>
	)
}