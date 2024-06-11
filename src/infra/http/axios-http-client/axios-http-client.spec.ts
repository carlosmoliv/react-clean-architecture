import axios from 'axios'
import { faker } from '@faker-js/faker'
import { AxiosHttpClient } from './axios-http-client'

jest.mock('axios')

describe('AxiosHttpClient', () => {
  let url: string
  let sut: AxiosHttpClient
  let mockedAxios: jest.Mocked<typeof axios>

  beforeAll(() => {
    mockedAxios = axios as jest.Mocked<typeof axios>
  })

  beforeEach(() => {
    url = faker.internet.url()
    sut = new AxiosHttpClient()
  })

  describe('post()', () => {
    let body: object

    beforeEach(() => {
      body = { accessToken: faker.string.uuid() }
    })

    test('Should call axios with correct values', async () => {
      await sut.post(url, body)

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockedAxios.post).toHaveBeenCalledWith(url, body)
    })
  })
})
