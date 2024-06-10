import { type HttpResponse } from '@/application/contracts/http-response'

export interface HttpPostClient {
  post: (url: string, body?: object) => Promise<HttpResponse>
}
