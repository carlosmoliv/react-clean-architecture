import { faker } from '@faker-js/faker'

import { type SignInInput } from '../use-cases/authentication/signin.input'

export const mockSignInput = (): SignInInput => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
