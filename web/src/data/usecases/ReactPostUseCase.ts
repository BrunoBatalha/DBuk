import { IHttpClientAdapter } from 'data/interfaces/IHttpClientAdapter';
import { AuthService } from 'infra/services/AuthService';
import { IReactPostUseCase } from 'presentation/interfaces/usecases/IReactPostUseCase';

export class ReactPostUseCase implements IReactPostUseCase {
  constructor(private httpClient: IHttpClientAdapter) {}

  async execute(request: ReactPostUseCaseParams): Promise<void> {
    await this.httpClient.post<void>('react-post/' + request.postId, {
      username: AuthService.getUsername(),
      password: AuthService.getPassword()
    });
  }
}

export type ReactPostUseCaseParams = {
  postId: number;
};
