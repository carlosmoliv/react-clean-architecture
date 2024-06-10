import { faker } from '@faker-js/faker'

import { type SignInInput } from '@/application/use-cases/authentication/signin.input'

export const mockSigInInput = (): SignInInput => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
