class Example {
  foo (): void {
    console.log('bar')
  }
}

describe('Example', () => {
  test('', () => {
    expect(new Example()).toBeInstanceOf(Example)
  })
})
