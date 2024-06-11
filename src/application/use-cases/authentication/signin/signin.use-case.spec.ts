import { faker } from '@faker-js/faker'

import { SignInUseCase } from './signin.use-case'
import { type SignInInput } from './signin.input'
import { HttpPostClientSpy, mockSigInInput } from '@/application/test'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { HttpStatusCode } from '@/application/contracts/http'
import { type Account } from '@/domain/entities/account'
import { mockAccount } from '@/domain/test'

describe('SignInUseCase', () => {
  let sut: SignInUseCase
  let httpPostClientSpy: HttpPostClientSpy<SignInInput, Account>
  let url: string

  beforeEach(() => {
    httpPostClientSpy = new HttpPostClientSpy<SignInInput, Account>()
    url = faker.internet.url()
    sut = new SignInUseCase(url, httpPostClientSpy)
  })

  test('Call to HttpClient with correct URL', async () => {
    httpPostClientSpy.response.body = mockAccount()

    await sut.execute(mockSigInInput())

    expect(httpPostClientSpy.url).toBe(url)
  })

  test('Call to HttpClient with correct body', async () => {
    httpPostClientSpy.response.body = mockAccount()
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

  test('Sign In throws UnexpectedError when the response is 200 and body is missing', async () => {
    const promise = sut.execute(mockSigInInput())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Sign In returns an Account when response is successful', async () => {
    const httpResult = mockAccount()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const input = mockSigInInput()

    const account = await sut.execute(input)

    expect(account).toEqual(httpResult)
  })
})
