import { BaseInputBoundary } from '@/app/useCases/BaseInputBoundary';

export type PublishPostInputBoundary = {
	categoriesIds: number[];
	image: {
		filename: string;
		buffer: Buffer;
		contentType: string;
	};
} & BaseInputBoundary;
