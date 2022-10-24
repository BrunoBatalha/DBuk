import { IHttpClientAdapter } from 'data/interfaces/IHttpClientAdapter';
import { CategoryDomain } from 'domain/post/CategoryDomain';
import { AuthService } from 'infra/services/AuthService';
import { IListCategoriesUseCase } from 'presentation/interfaces/usecases/IListCategoriesUseCase';

export class ListCategoriesUseCase implements IListCategoriesUseCase {
	constructor(private httpClient: IHttpClientAdapter) { }

	async execute(): Promise<CategoryDomain[]> {
		const response = await this.httpClient.get<ListCategoriesResponse>('categories', {
			username: AuthService.getUsername(),
			password: AuthService.getPassword()
		});

		return response.list.map((r) => CategoryDomain.create({ ...r }));
	}
}

type ListCategoriesResponse = {
	list: Array<{
		id: number;
		title: string;
	}>;
};
