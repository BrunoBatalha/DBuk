export enum ModelAliasAssociationEnum {
	user = 'user',
	posts = 'posts',
	reactions = 'reactions',
	categories = 'categories',
	usersReactions = 'usersReactions'
}

export type ModelAliasAssociation = keyof typeof ModelAliasAssociationEnum;
