import { HttpClient } from "../../core/http/http-client";
import { ListPostsDto } from "./list-posts-dto";
import { PostDomain } from "./PostDomain";

export class PostHttp {

	constructor(private httpClient: HttpClient) {
	}

	async list(): Promise<ListPostsDto> {
		const response = await this.httpClient.get<ListPostsResponse>('posts', {
			username: 'bruno',
			password: 'brunao'
		})

		return {
			list: response.list.map(r => PostDomain.create({ ...r }))
		}
	}
}

interface ListPostsResponse {
	list: Array<{
		id: number;
		createdAt: Date
		user: {
			id: number;
			username: string;
		}
	}>
}