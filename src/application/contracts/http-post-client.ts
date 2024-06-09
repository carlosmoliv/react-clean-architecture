export interface HttpPostClient {
  post: (url: string, body?: object) => Promise<void>
}
