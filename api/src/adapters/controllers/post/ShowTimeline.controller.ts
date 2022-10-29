import { IShowTimelineUseCase } from '@/adapters/interfaces/useCases/post/showTimeline/IShowTimeline.usecase';
import { IShowTimelineValidator } from '@/adapters/interfaces/useCases/post/showTimeline/IShowTimeline.validator';
import { IBaseOutputBoundary } from '@/app/useCases/IBaseOutputBoundary';
import { ShowTimelineInputDto } from '@/app/useCases/post/showTimeline/dtos/ShowTimelineInput.dto';
import { ShowtimelineOutputDto as ShowTimelineOutputDto } from '@/app/useCases/post/showTimeline/dtos/ShowTimelineOutput.dto';
import { UseCaseManagerLoadManyData } from '@/app/useCases/UseCaseManagerLoadManyData';
import { statusCodes } from '@/infra/statusCodes';

interface IResponse {
	output: any;
	statusCode?: number;
}

type PostControllerDependencies = {
	usecase: IShowTimelineUseCase;
	validator: IShowTimelineValidator;
};

export class ShowTimelineController {
	private usecase: IShowTimelineUseCase;
	private validator: IShowTimelineValidator;

	constructor(dependencies: PostControllerDependencies) {
		this.usecase = dependencies.usecase;
		this.validator = dependencies.validator;
	}

	async execute(input: ShowTimelineInputDto): Promise<IResponse> {
		try {
			const usecase = new UseCaseManagerLoadManyData(this.usecase, this.validator, input);
			const response = await usecase.execute();
			if (!response.statusCode) {
				response.statusCode = statusCodes.CREATED;
			}

			return this.getResponse<ShowTimelineOutputDto>(response);
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
