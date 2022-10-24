import { IShowTimelineUseCase } from '@/adapters/interfaces/useCases/post/showTimeline/IShowTimeline.usecase';
import { PostDto } from '@/app/dtos';
import { IPostRepository } from '@/app/interfaces/repositories/IPost.repository';
import { Post } from '@/domain/entities/Post';
import { ShowTimelineInputDto } from './dtos/ShowTimelineInput.dto';
import { ShowtimelineOutputDto } from './dtos/ShowTimelineOutput.dto';

export class ShowTimelineUseCase implements IShowTimelineUseCase {
	private postRepository: IPostRepository;

	constructor(postRepository: IPostRepository) {
		this.postRepository = postRepository;
	}

	async execute(_input: ShowTimelineInputDto): Promise<ShowtimelineOutputDto> {
		try {
			const postList = await this.postRepository.addInclude('user').list();
			return { list: this.convertToOutput(postList) } as ShowtimelineOutputDto;
		} catch (error: any) {
			throw new Error(error);
		}
	}

	private convertToOutput(postList: Post[]): PostDto[] {
		return postList.map((p) => PostDto.convertDomainToDto(p));
	}
}
