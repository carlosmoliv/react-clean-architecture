import axios from 'axios'
import { type HttpPostClient, type HttpResponse } from '@/application/contracts/http'

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post (url: string, body?: any): Promise<HttpResponse<any>> {
    const httpResponse = await axios.post(url, body)
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}
