import { BaseInputBoundary } from '@/app/useCases/BaseInputBoundary';

export type PublishPostInputBoundary = {
	categoriesIds: number[];
	image: FileInputDto;
} & BaseInputBoundary;

export type FileInputDto = {
	filename: string;
	buffer: Buffer;
	contentType: string;
};
