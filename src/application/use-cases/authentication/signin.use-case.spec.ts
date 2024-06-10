import { faker } from '@faker-js/faker'

import { SignInUseCase } from './signin.use-case'
import { HttpPostClientSpy } from '@/application/test/mock-http-client'
import { mockSigInInput } from '@/application/test/mock-sigin-input'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials.error'
import { HttpStatusCode } from '@/application/contracts/http-response'
import { UnexpectedError } from '@/domain/errors/unexpected.error'
import { type Account } from '@/domain/entities/account'
import { type SignInInput } from './signin.input'

describe('SignInUseCase', () => {
  let sut: SignInUseCase
  let httpPostClientSpy: HttpPostClientSpy<SignInInput, Account>
  let url: string

  beforeEach(() => {
    httpPostClientSpy = new HttpPostClientSpy()
    url = faker.internet.url()
    sut = new SignInUseCase(url, httpPostClientSpy)
  })

  test('Call to HttpClient with correct URL', async () => {
    await sut.execute(mockSigInInput())

    expect(httpPostClientSpy.url).toBe(url)
  })

  test('Call to HttpClient with correct body', async () => {
    const signInput = mockSigInInput()

    await sut.execute(signInput)

    expect(httpPostClientSpy.body).toEqual(signInput)
  })

  test('Sign In throws InvalidCredentialsError for unauthorized access response', async () => {
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }

    const promise = sut.execute(mockSigInInput())

    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  test('Sign In throws UnexpectedError for bad request response', async () => {
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }

    const promise = sut.execute(mockSigInInput())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Sign In throws UnexpectedError for server error response', async () => {
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    const promise = sut.execute(mockSigInInput())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Sign In throws UnexpectedError for not found response', async () => {
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    const promise = sut.execute(mockSigInInput())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Sign In throws UnexpectedError for not found response', async () => {
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    const promise = sut.execute(mockSigInInput())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
