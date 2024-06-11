import axios from 'axios'
import { AxiosHttpClient } from './axios-http-client'
import { faker } from '@faker-js/faker'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('AxiosHttpClient', () => {
  let url: string
  let sut = new AxiosHttpClient()

  beforeAll(() => {
    url = faker.internet.url()
    sut = new AxiosHttpClient()
  })

  test('Should call axios correct URL', async () => {
    await sut.post(url)

    expect(mockedAxios).toHaveBeenCalledWith(url)
  })
})
