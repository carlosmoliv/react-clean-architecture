import { type HttpPostClient, type HttpResponse, HttpStatusCode } from '@/application/contracts/http'

export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url?: string
  body?: T
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async post (url: string, body?: T): Promise<HttpResponse<R>> {
    this.url = url
    this.body = body
    return this.response
  }
}
