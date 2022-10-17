import { IModelAdapter } from './IModelAdapter';

export interface IDatabaseAdapter {
	userModel: IModelAdapter;
	postModel: IModelAdapter;
	categoryModel: IModelAdapter;
	postCategoryModel: IModelAdapter;
	reactionModel: IModelAdapter;
	postUserReactionModel: IModelAdapter;
}
