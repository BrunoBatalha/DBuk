import Dtos from 'data/Dtos';
import { IHttpClientAdapter } from 'data/interfaces/IHttpClientAdapter';
import { PostDomain } from 'domain/entities';
import { AuthService } from 'infra/services/AuthService';
import { IShowTimelineUseCase } from 'presentation/interfaces/usecases/IShowTimelineUseCase';

export class ShowTimelineUseCase implements IShowTimelineUseCase {
	constructor(private httpClient: IHttpClientAdapter) {}

	async execute(page: number, perPage: number): Promise<Dtos.ListPostsDto> {
		const response = await this.httpClient.get<ListPostsResponse>('posts', {
			username: AuthService.getUsername(),
			password: AuthService.getPassword(),
			page,
			perPage
		});

		return {
			list: response.list.map((r) => new PostDomain({ ...r })),
			pagination: { total: response.pagination.total }
		};
	}
}

type ListPostsResponse = {
	list: Dtos.PostDto[];
	pagination: Dtos.PaginationDto;
};
