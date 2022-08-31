import { IDatabaseAdapter } from '../interfaces/IDatabaseAdapter';
import { IModelAdapter } from '../interfaces/IModelAdapter';
import { ModelAdapter } from './ModelAdapter';

export class DatabaseAdapter implements IDatabaseAdapter {
	userModel: IModelAdapter = new ModelAdapter('UserModel');
	postModel: IModelAdapter = new ModelAdapter('PostModel');
	categoryModel: IModelAdapter = new ModelAdapter('CategoryModel');
	postCategoryModel: IModelAdapter = new ModelAdapter('PostCategoryModel');
}
