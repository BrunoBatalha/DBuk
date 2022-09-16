type UserDtoParams = {
	id: string;
	username: string;
};

export class UserDto {
	readonly id: string;
	readonly username: string;

	constructor(params: UserDtoParams) {
		this.id = params.id;
		this.username = params.username;
	}
}
