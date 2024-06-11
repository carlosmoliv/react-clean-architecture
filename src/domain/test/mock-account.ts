import { Account } from '@/domain/entities/account'
import { faker } from '@faker-js/faker'

export const mockAccount = (): Account => {
  return new Account(faker.string.uuid())
}
