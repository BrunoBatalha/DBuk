type Params = {
	id: number;
	username: string;
};

export class UserDomain {
	id?: number;
	username!: string;

	constructor(params: Params) {
		this.id = params.id;
		this.username = params.username;
	}
}
