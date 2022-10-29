export class Reaction {
	id: number;
	title: Reaction.ReactionEnum;

	private constructor(params: Reaction.Params) {
		this.id = params.id;
		this.title = params.title;
	}

	static create(params: Reaction.Params): Reaction {
		return new Reaction(params);
	}
}

export namespace Reaction {
	export type Params = {
		id: number;
		title: ReactionEnum;
	};
	export enum ReactionEnum {
		Like = 'like'
	}
}
