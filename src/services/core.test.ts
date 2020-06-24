import * as Core from './core'

describe('tests core service', () => {
  it('shoud build core api query correctly', () => {
    const testQuery = Core.buildSearchQuery({
      terms: 'John',
      startYear: 1990,
      finishYear: 2000
    })
    expect(testQuery).toEqual('John AND year:>=1990 AND year:<=2000')
  })

  it('shoud return core config request correctly', () => {
    const testConfig = Core.requestConfig({
      path: 'get/3545649',
      method: 'get'
    })
    expect(testConfig).toMatchObject({
      method: 'get',
      url:
        'https://core.ac.uk:443/api-v2/articles/get/3545649?apiKey=Hu1ApJ4YcW9POS5LjzZqXa6tlsMFKrGn'
    })
  })
})
