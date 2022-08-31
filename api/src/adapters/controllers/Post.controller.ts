import { IBaseOutputBoundary } from '@/app/useCases/IBaseOutputBoundary';
import { PublishPostInputBoundary } from '@/app/useCases/post/publishPost/boundaries/PublishPostInputBoundary';
import { PublishPostOutputBoundary } from '@/app/useCases/post/publishPost/boundaries/PublishPostOutputBoundary';
import { UseCaseManagerLoadManyData } from '@/app/useCases/UseCaseManagerLoadManyData';
import { statusCodes } from '@/infra/statusCodes';
import { IPublishPostUseCase } from '../interfaces/useCases/post/publishPost/IPublishPost.usecase';
import { IPublishPostValidator } from '../interfaces/useCases/post/publishPost/IPublishPost.validator';

interface IResponse {
	output: any;
	statusCode?: number;
}

type PostControllerDependencies = {
	usecase: IPublishPostUseCase;
	validator: IPublishPostValidator;
};

export class PostController {
	private publishPostUseCase: IPublishPostUseCase;
	private publishPostValidator: IPublishPostValidator;

	constructor(dependencies: PostControllerDependencies) {
		this.publishPostUseCase = dependencies.usecase;
		this.publishPostValidator = dependencies.validator;
	}

	async execute(input: PublishPostInputBoundary): Promise<IResponse> {
		try {
			const usecase = new UseCaseManagerLoadManyData(this.publishPostUseCase, this.publishPostValidator, input);
			const response = await usecase.execute();
			response.statusCode = statusCodes.CREATED;

			return this.getResponse<PublishPostOutputBoundary>(response);
		} catch (error: any) {
			return this.getResponse<unknown>({
				statusCode: statusCodes.INTERNAL_SERVER_ERROR,
				value: error.toString(),
				errorMessages: []
			});
		}
	}

	private getResponse<TOuput>(response: IBaseOutputBoundary<TOuput>): IResponse {
		if (response.errorMessages?.length) {
			return { output: response.errorMessages, statusCode: response.statusCode };
		}

		return { output: response.value, statusCode: response.statusCode };
	}
}
