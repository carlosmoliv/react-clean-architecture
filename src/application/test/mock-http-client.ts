import { type HttpPostClient } from '../contracts/http-post-client'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body?: object

  async post (url: string, body?: object): Promise<void> {
    this.url = url
    this.body = body
  }
}
