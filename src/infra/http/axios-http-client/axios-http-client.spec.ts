import axios from 'axios'
import { faker } from '@faker-js/faker'
import { AxiosHttpClient } from './axios-http-client'

jest.mock('axios')
const mockedAxiosResult = {
  data: { anyProperty: faker.lorem.word() },
  status: faker.number.int()
}

describe('AxiosHttpClient', () => {
  let url: string
  let body: object
  let sut: AxiosHttpClient
  let mockedAxios: jest.Mocked<typeof axios>

  beforeAll(() => {
    mockedAxios = axios as jest.Mocked<typeof axios>
    mockedAxios.post.mockResolvedValue(mockedAxiosResult)
  })

  beforeEach(() => {
    url = faker.internet.url()
    body = { anyProperty: faker.lorem.word() }
    sut = new AxiosHttpClient()
  })

  describe('post()', () => {
    test('Should call axios with correct values', async () => {
      await sut.post(url, body)

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockedAxios.post).toHaveBeenCalledWith(url, body)
    })

    test('Return the correct response', async () => {
      const httpResponse = await sut.post(url, body)

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(httpResponse).toEqual({
        statusCode: mockedAxiosResult.status,
        body: mockedAxiosResult.data
      })
    })
  })
})
