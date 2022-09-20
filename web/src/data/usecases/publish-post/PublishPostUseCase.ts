import { IHttpClientAdapter } from 'data/interfaces/IHttpClientAdapter';
import { AuthService } from 'infra/services/AuthService';
import { IPublishPostUseCase } from 'presentation/interfaces/usecases/IPublishPostUseCase';

export class PublishPostUseCase implements IPublishPostUseCase {
	constructor(private httpClient: IHttpClientAdapter) { }

	async save(request: SavePostRequest): Promise<void> {
		const formData = new FormData();
		formData.append('username', AuthService.getUsername());
		formData.append('password', AuthService.getPassword());
		formData.append('image', request.image);
		request.categoriesIds.forEach((ci) => {
			formData.append(`categoriesIds`, ci.toString());
		});

		await this.httpClient.post<void>('posts', formData);
	}
}

export type SavePostRequest = {
	categoriesIds: number[];
	image: Blob;
};
