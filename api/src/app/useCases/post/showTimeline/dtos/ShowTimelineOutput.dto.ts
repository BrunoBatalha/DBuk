import { PostDto } from '@/app/dtos';

export type ShowtimelineOutputDto = {
	list: PostDto[];
	pagination: {
		total: number;
	};
};
