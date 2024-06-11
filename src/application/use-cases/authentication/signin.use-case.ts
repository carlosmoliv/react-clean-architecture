import { type HttpPostClient } from '@/application/contracts/http-post-client'
import { type SignInInput } from './signin.input'
import { HttpStatusCode } from '@/application/contracts/http-response'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials.error'
import { UnexpectedError } from '@/domain/errors/unexpected.error'
import { type Account } from '@/domain/entities/account'

export class SignInUseCase {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpPostClient<SignInInput, Account>
  ) {}

  async execute (input: SignInInput): Promise<Account> {
    const httpResponse = await this.httpClient.post(this.url, input)
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        console.log(httpResponse.body)
        if (httpResponse?.body === undefined) throw new UnexpectedError()
        return httpResponse.body
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()
      default:
        throw new UnexpectedError()
    }
  }
}
