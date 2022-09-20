import { PostDomain } from 'domain/post/PostDomain';
import { IShowTimelineUseCase } from 'presentation/interfaces/usecases/IShowTimelineUseCase';
import { useEffect, useState } from 'react';
import { MdChatBubbleOutline, MdFavorite, MdOutlineMoreHoriz, MdOutlineThumbUp, MdThumbUp } from 'react-icons/md';
import { Container } from 'shared/components/container/container';
import './style.scss';

type Props = {
	useCase: IShowTimelineUseCase;
};

export function Timeline({ useCase }: Props): JSX.Element {
	const [posts, setPosts] = useState<PostDomain[]>([]);

	useEffect(() => {
		loadPosts();
	}, []);

	async function loadPosts(): Promise<void> {
		const { list } = await useCase.list();
		setPosts(list);
	}

	return (
		<Container>
			{posts.map((p) => {
				return (
					<div className="timeline" key={p.id}>
						<header className="timeline__header">
							<img className="timeline__avatar" src="https://via.placeholder.com/300/fff/808080" />

							<div className="timeline__description">
								<div>
									<span className="timeline__username">{p.getUsername()}</span>
									<span className="timeline__action">publicou</span>
								</div>
								<span className="timeline__date-publish">{p.getPublishedDateToDisplay()}</span>
							</div>

							<button className="timeline__btn-action">
								<MdOutlineMoreHoriz />
							</button>
						</header>

						<img className="timeline__image" src={p.image} />

						<footer>
							<section className="timeline__info-reaction-comments">
								<div className="timeline__reactions">
									<span className="timeline__reaction-like">
										<MdThumbUp />
									</span>
									<span className="timeline__reaction-loved">
										<MdFavorite />
									</span>
									<span className="timeline__reaction-amount">400</span>
								</div>
								<p className="timeline__comments">122 Comments</p>
							</section>

							<section className="timeline__actions">
								<button className="timeline__action-button">
									<MdOutlineThumbUp size={26} />
									<span className="timeline__action-text">Like</span>
								</button>
								<button className="timeline__action-button">
									<MdChatBubbleOutline size={26} />
									<span className="timeline__action-text">Comment</span>
								</button>
							</section>
						</footer>
					</div>
				);
			})}
		</Container>
	);
}
