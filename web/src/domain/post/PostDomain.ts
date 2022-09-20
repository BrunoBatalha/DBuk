import { DomainException } from 'domain/errors/DomainException';
import { PostError } from 'domain/errors/PostErrors';
import { UserDomain } from 'domain/user/UserDomain';

interface PostDomainParams {
	id: number;
	user: UserDomain;
	image: string;
	createdAt: Date;
}

export class PostDomain {
	id: number;
	image: string;
	user: UserDomain;
	createdAt: Date;

	private constructor(params: PostDomainParams) {
		this.id = params.id;
		this.user = params.user;
		this.createdAt = params.createdAt;
		this.image = params.image;
	}

	getUsername(): string | undefined {
		return this.user.username;
	}

	getPublishedDateToDisplay(): string {
		const { diffHours, diffMinutes } = this.diffHoursBetweenNowAndPublishedPost();
		const hoursTotal = 24;
		if (diffHours < 1) {
			return `${diffMinutes} minutos atrás`;
		}

		if (diffHours <= hoursTotal) {
			return `${diffHours} horas atrás`;
		}

		const datePublished = new Date(this.createdAt);
		const month = datePublished.getMonth() + 1;

		return `${datePublished.getDate()}/${month.toString().padStart(2, '0')}/${datePublished.getFullYear()}`;
	}

	private diffHoursBetweenNowAndPublishedPost(): { diffHours: number; diffMinutes: number } {
		const now = new Date();
		const diffMilliseconds = Math.abs(new Date(this.createdAt).getTime() - now.getTime());
		const seconds = Math.floor(diffMilliseconds / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);

		return { diffHours: hours, diffMinutes: minutes };
	}

	static create(params: PostDomainParams): PostDomain {
		if (!params.createdAt) {
			throw new DomainException(PostError.PublisheDateInvalid);
		}

		return new PostDomain(params);
	}
}
