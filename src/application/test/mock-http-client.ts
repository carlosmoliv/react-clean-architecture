import { type HttpPostClient } from '@/application/contracts/http-post-client'
import { HttpStatusCode, type HttpResponse } from '@/application/contracts/http-response'

export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url?: string
  body?: T
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async post (url: string, body?: T): Promise<HttpResponse<R>> {
    this.url = url
    this.body = body
    return await Promise.resolve(this.response)
  }
}
