import { type HttpPostClient } from '@/application/contracts/http-post-client'
import { type SignInInput } from './signin.input'

export class SignInUseCase {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpPostClient
  ) {}

  async execute (input: SignInInput): Promise<void> {
    await this.httpClient.post(this.url, input)
  }
}
