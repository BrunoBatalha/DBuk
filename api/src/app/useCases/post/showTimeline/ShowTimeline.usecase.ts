import { IShowTimelineUseCase } from '@/adapters/interfaces/useCases/post/showTimeline/IShowTimeline.usecase';
import { PostDto } from '@/app/dtos';
import { IPostRepository } from '@/app/interfaces/repositories/IPost.repository';
import { Post } from '@/domain/entities/Post';
import { BaseValidatorOutput } from '../../BaseValidatorOutput';
import { ShowTimelineInputDto } from './dtos/ShowTimelineInput.dto';
import { ShowtimelineOutputDto } from './dtos/ShowTimelineOutput.dto';

export class ShowTimelineUseCase implements IShowTimelineUseCase {
	private postRepository: IPostRepository;
	outputDataValidator!: BaseValidatorOutput;

	constructor(postRepository: IPostRepository) {
		this.postRepository = postRepository;
	}

	setOutputDataValidator(output: BaseValidatorOutput): void {
		this.outputDataValidator = output;
	}

	async execute(input: ShowTimelineInputDto): Promise<ShowtimelineOutputDto> {
		try {
			const { list: postList, total } = await this.postRepository.listOrderBy({
				limit: input.perPage,
				offset: input.perPage * input.page,
				orderBy: 'DESC',
				parameterToOrder: 'createdAt'
			});

			return {
				list: this.convertToOutput(postList),
				pagination: {
					total
				}
			} as ShowtimelineOutputDto;
		} catch (error: any) {
			throw new Error(error);
		}
	}

	private convertToOutput(postList: Post[]): PostDto[] {
		return postList.map((p) => PostDto.convertDomainToDto(p, this.outputDataValidator.userId));
	}
}
