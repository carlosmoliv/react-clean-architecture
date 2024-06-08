import { type HttpPostClient } from './contracts/http-client'
import { SignInUseCase } from './signin.use-case'

class HttpPostClientSpy implements HttpPostClient {
  url?: string

  async post (url: string): Promise<void> {
    this.url = url
  }
}

describe('SignInUseCase', () => {
  let sut: SignInUseCase
  let httpPostClientSpy: HttpPostClientSpy
  let url: string

  beforeEach(() => {
    httpPostClientSpy = new HttpPostClientSpy()
    url = 'any_url'
    sut = new SignInUseCase(url, httpPostClientSpy)
  })

  test('Call to HttpClient with correct URL', async () => {
    await sut.execute()

    expect(httpPostClientSpy.url).toBe(url)
  })
})
