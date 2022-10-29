import { ReactionEnum } from 'domain/enums/ReactionEnum';
import { DomainException } from 'domain/errors/DomainException';
import { PostError } from 'domain/errors/PostErrors';
import { UserDomain } from 'domain/user/UserDomain';

type PostDomainParams = {
	id: number;
	image: string;
	user: UserDomain;
	reaction?: ReactionEnum;
	createdAt: Date;
	isReacted: boolean;
};

export class PostDomain {
	id: number;
	image: string;
	user: UserDomain;
	reaction?: ReactionEnum | null;
	isReacted: boolean = false;
	createdAt: Date;

	private constructor(params: PostDomainParams) {
		this.id = params.id;
		this.image = params.image;
		this.user = params.user;
		this.reaction = params.reaction;
		this.createdAt = new Date(params.createdAt);
		this.isReacted = params.isReacted;
	}

	getUsername(): string {
		return this.user.username;
	}

	getPublishedDateToDisplay(): string {
		const { diffHours, diffMinutes } = this.diffHoursBetweenNowAndPublishedPost();
		const hoursTotal = 24;
		if (diffHours < 1) {
			return `${diffMinutes} minuto${diffHours === 1 ? '' : 's'} atrás`;
		}

		if (diffHours <= hoursTotal) {
			return `${diffHours} hora${diffHours === 1 ? '' : 's'} atrás`;
		}

		return this.formatDate();
	}

	private diffHoursBetweenNowAndPublishedPost(): { diffHours: number; diffMinutes: number } {
		const now = new Date();
		const diffMilliseconds = Math.abs(new Date(this.createdAt).getTime() - now.getTime());
		const seconds = Math.floor(diffMilliseconds / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);

		return { diffHours: hours, diffMinutes: minutes };
	}

	private formatDate(): string {
		return new Intl.DateTimeFormat('pt-BR', {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric',
			hour12: false
		}).format(this.createdAt);
		// Lógica veio do React Native mas na web existe o Intl
		// const datePublished = new Date(this.createdAt);
		// const month = datePublished.getMonth() + 1;

		// return `${datePublished.getDate().toString().padStart(2, '0')}/
		// 				${month.toString().padStart(2, '0')}/
		// 				${datePublished.getFullYear()}`;
	}

	static create(params: PostDomainParams): PostDomain {
		if (!params.createdAt) {
			throw new DomainException(PostError.PublisheDateInvalid);
		}

		return new PostDomain(params);
	}
}
