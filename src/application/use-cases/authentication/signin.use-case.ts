import { type HttpPostClient } from '@/application/contracts/http-post-client'
import { type SignInInput } from './signin.input'
import { HttpStatusCode } from '@/application/contracts/http-response'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials.error'

export class SignInUseCase {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpPostClient
  ) {}

  async execute (input: SignInInput): Promise<void> {
    const httpResponse = await this.httpClient.post(this.url, input)
    switch (httpResponse.statusCode) {
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()
    }
  }
}
