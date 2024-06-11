import axios from 'axios'

export class AxiosHttpClient {
  async post (url: string, body?: any): Promise<void> {
    await axios.post(url, body)
  }
}
