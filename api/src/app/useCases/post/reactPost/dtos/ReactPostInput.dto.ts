import { BaseInputBoundary } from '@/app/useCases/BaseInputBoundary';

export type ReactPostInputDto = {
	postId: number;
} & BaseInputBoundary;
