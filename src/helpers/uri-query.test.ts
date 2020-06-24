import * as UriQuery from './uri-query'

describe('tests uri query helper', () => {
  it('should return a number', () => {
    const queryString = '999'
    const number = UriQuery.queryToInt(queryString)
    expect(number).toBe(999)
  })

  it('should return filters object', () => {
    const filters = {
      terms: 'John',
      startYear: '1990',
      finishYear: '2000',
      page: '5'
    }
    const { terms, startYear, finishYear, page } = filters
    const query = `?terms=${terms}&startYear=${startYear}&finishYear=${finishYear}&page=${page}`
    const test = UriQuery.getQuery(query)
    expect(test).toEqual(filters)
  })

  it('should return page number', () => {
    const queryString = '?terms=John&page=6'
    const page = UriQuery.getQueryPage(queryString)
    expect(page).toBe(6)
  })

  it('should build uri query from filters', () => {
    const filters = {
      terms: 'John',
      startYear: 1990,
      finishYear: 2000,
      page: 5
    }
    const test = UriQuery.buildUriQuery(filters)
    const { terms, startYear, finishYear, page } = filters
    expect(test).toBe(
      `finishYear=${finishYear}&page=${page}&startYear=${startYear}&terms=${terms}`
    )
  })
})
