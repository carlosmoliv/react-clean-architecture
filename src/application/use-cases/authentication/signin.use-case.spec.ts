import { faker } from '@faker-js/faker'

import { SignInUseCase } from './signin.use-case'
import { HttpPostClientSpy } from '@/application/test/mock-http-client'
import { mockSigInInput } from '@/application/test/mock-sigin-input'

describe('SignInUseCase', () => {
  let sut: SignInUseCase
  let httpPostClientSpy: HttpPostClientSpy
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
})
