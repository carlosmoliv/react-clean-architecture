import { type HttpPostClient } from '../contracts/http-post-client'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string

  async post (url: string): Promise<void> {
    this.url = url
  }
}
