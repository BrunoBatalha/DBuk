type UserDtoParams = {
	id: number;
	username: string;
};

export class UserDto {
	readonly id: number;
	readonly username: string;

	constructor(params: UserDtoParams) {
		this.id = params.id;
		this.username = params.username;
	}
}
