import { type HttpPostClient } from './contracts/http-client'

export class SignInUseCase {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpPostClient
  ) {}

  async execute (): Promise<void> {
    await this.httpClient.post(this.url)
  }
}
