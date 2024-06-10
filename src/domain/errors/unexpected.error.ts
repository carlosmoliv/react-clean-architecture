export class UnexpectedError extends Error {
  constructor () {
    super('Something went wrong! Please try again later or contact support.')
    this.name = 'UnexpectedError'
  }
}
