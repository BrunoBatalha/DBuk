import { UserModelType } from './UserModelType';

export type PostModelType = {
	id: number;
	imageUri: string;
	user: UserModelType;
};
