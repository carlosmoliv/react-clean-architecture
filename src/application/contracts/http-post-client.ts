import { type HttpResponse } from '@/application/contracts/http-response'

export interface HttpPostClient<T, R> {
  post: (url: string, body?: T) => Promise<HttpResponse<R>>
}
