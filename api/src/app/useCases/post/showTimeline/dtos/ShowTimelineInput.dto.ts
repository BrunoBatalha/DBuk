import { BaseInputBoundary } from '@/app/useCases/BaseInputBoundary';

export type ShowTimelineInputDto = {
	page: number;
	perPage: number;
} & BaseInputBoundary;
