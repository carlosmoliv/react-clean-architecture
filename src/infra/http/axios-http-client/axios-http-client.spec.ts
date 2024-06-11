import axios from 'axios'
import { faker } from '@faker-js/faker'
import { AxiosHttpClient } from './axios-http-client'

jest.mock('axios')

describe('AxiosHttpClient', () => {
  let url: string
  let sut: AxiosHttpClient
  let mockedAxios: jest.Mocked<typeof axios>

  beforeAll(() => {
    url = faker.internet.url()
    mockedAxios = axios as jest.Mocked<typeof axios>
  })

  beforeEach(() => {
    sut = new AxiosHttpClient()
  })

  test('Should call axios correct URL and http verb', async () => {
    await sut.post(url)

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockedAxios.post).toHaveBeenCalledWith(url)
  })
})
