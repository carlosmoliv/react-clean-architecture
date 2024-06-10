import { type HttpPostClient } from '@/application/contracts/http-post-client'
import { HttpStatusCode, type HttpResponse } from '@/application/contracts/http-response'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body?: object
  response: HttpResponse = {
    statusCode: HttpStatusCode.noContent
  }

  async post (url: string, body?: object): Promise<HttpResponse> {
    this.url = url
    this.body = body
    return await Promise.resolve(this.response)
  }
}
