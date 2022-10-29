export enum ModelAliasAssociationEnum {
	user = 'user',
	posts = 'posts',
	reactions = 'reactions',
	categories = 'categories'
}

export type ModelAliasAssociation = keyof typeof ModelAliasAssociationEnum;
