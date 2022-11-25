import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useThemeStyle } from "../../../infra/themeContextProvider";
import { MaterialIcon } from "../../importIcons";
import { getStylesComponent } from "./styles";

type Props = {
	author: string;
	datePost: string;
	uriAvatarImage: string;
	uriPostImage: string;
	totalReactions: number;
	totalComments: number;
}

export function Post({ author, datePost, totalReactions, uriAvatarImage, uriPostImage, totalComments }: Props) {
	const styles = useThemeStyle(getStylesComponent);

	return (
		<View style={styles.post}>
			<View style={styles.header}>
				<Image style={styles.avatar} source={{ uri: uriAvatarImage }} />

				<View style={styles.headerInformations}>
					<View style={styles.headerInformationsUser}>
						<Text style={styles.headerUsername}>{author}</Text>
						<Text style={styles.headerAction}>publicou</Text>
					</View>
					<Text style={styles.headerDatePost}>{datePost}</Text>
				</View>
			</View>

			<Image style={styles.imagePost} source={{ uri: uriPostImage }} />

			<View style={styles.footerPost}>
				<View style={styles.footerReactions}>
					<MaterialIcon name='thumb-up' style={styles.footerIconThumb} />
					<MaterialIcon name='favorite' style={styles.footerIconFavorite} />
					<Text style={styles.footerReactionsNumber}>{totalReactions}</Text>
				</View>

				<TouchableOpacity>
					<Text style={styles.footerCommentsInfo}>{totalComments} Comments</Text>
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
	)
}