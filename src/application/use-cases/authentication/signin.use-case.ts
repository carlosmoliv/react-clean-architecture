import { type HttpPostClient } from '../../contracts/http-post-client'

export class SignInUseCase {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpPostClient
  ) {}

  async execute (): Promise<void> {
    await this.httpClient.post(this.url)
  }
}
