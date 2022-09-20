import { IPublishPostUseCase } from 'presentation/interfaces/usecases/IPublishPostUseCase';
import { Container } from 'shared/components/container/container';
// import './style.scss';

type Props = {
	useCase: IPublishPostUseCase;
};

export function PublishPost({ useCase }: Props): JSX.Element {
	async function publishPost(fileList: FileList | null): Promise<void> {
		if (!fileList) {
			return;
		}
		const file = fileList[0];
		await useCase.save({
			image: file,
			categoriesIds: [1, 4]
		});
	}

	return (
		<Container>
			<input
				type="file"
				onChange={(e): void => {
					publishPost(e.target.files);
				}}
			/>
		</Container>
	);
}
