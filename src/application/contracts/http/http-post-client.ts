import { type HttpResponse } from './http-response'

export interface HttpPostClient<T, R> {
  post: (url: string, body?: T) => Promise<HttpResponse<R>>
}
