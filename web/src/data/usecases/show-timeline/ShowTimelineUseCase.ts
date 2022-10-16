import { ListPostsDto } from 'data/dtos/ListPostsDto';
import { IHttpClientAdapter } from 'data/interfaces/IHttpClientAdapter';
import { ReactionEnum } from 'domain/enums/ReactionEnum';
import { PostDomain } from 'domain/post/PostDomain';
import { AuthService } from 'infra/services/AuthService';
import { IShowTimelineUseCase } from 'presentation/interfaces/usecases/IShowTimelineUseCase';

export class ShowTimelineUseCase implements IShowTimelineUseCase {
	constructor(private httpClient: IHttpClientAdapter) { }

	async execute(): Promise<ListPostsDto> {
		const response = await this.httpClient.get<ListPostsResponse>('posts', {
			username: AuthService.getUsername(),
			password: AuthService.getPassword()
		});

		return {
			list: response.list.map((r) => PostDomain.create({ ...r }))
		};
	}
}

type ListPostsResponse = {
	list: Array<{
		image: string;
		id: number;
		createdAt: Date;
		reaction?: ReactionEnum;
		user: {
			id: number;
			username: string;
		};
	}>;
};
