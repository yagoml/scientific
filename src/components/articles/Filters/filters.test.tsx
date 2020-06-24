import { Filters } from './index'

describe('shold test returnable functions of component filters', () => {
  const props = {
    filters: {},
    total: 0,
    setFilters: jest.fn,
    cleanFilters: jest.fn,
    apply: jest.fn
  }

  const filters = new Filters(props)

  it('should check years valid', () => {
    filters.state = {
      startYear: 1990,
      finishYear: 2000
    }
    const test = filters.checkYears()
    expect(test).toBeTruthy()
  })

  it('should check years invalid', () => {
    filters.state = {
      startYear: 2000,
      finishYear: 1990
    }
    const test = filters.checkYears()
    expect(test).toBeFalsy()
  })

  it('should build select years', () => {
    const test = filters.buildYears()
    expect(test).toHaveLength(221)
  })

  it('should return filter applied true', () => {
    filters.state = {
      startYear: 2000,
      finishYear: 1990
    }
    const test = filters.hasFilter()
    expect(test).toBeTruthy()
  })

  it('should return filter applied false', () => {
    filters.state = { terms: '', startYear: 0, finishYear: undefined }
    const test = filters.hasFilter()
    expect(test).toBeFalsy()
  })
})
