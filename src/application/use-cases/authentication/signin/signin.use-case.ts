import { type HttpPostClient, HttpStatusCode } from '@/application/contracts/http'
import { type SignInInput } from './signin.input'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
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
        if (httpResponse?.body === undefined) throw new UnexpectedError()
        return httpResponse.body
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()
      default:
        throw new UnexpectedError()
    }
  }
}
