import { BaseInputBoundary } from '@/app/useCases/BaseInputBoundary';

export type PublishPostInputBoundary = {
	categoriesIds: number[];
} & BaseInputBoundary;
