import * as Favorites from './favorites'

describe('tests favorites service', () => {
  it('should test get favorites articles of localstorage', () => {
    const items = localStorage.getItem(Favorites.LS_KEY)
    const testItems = Favorites.getItems(1)
    if (!items) return expect(testItems).toHaveLength(0)
    expect(testItems.length > 0).toBeTruthy()
  })

  it('should test get favorites total', () => {
    const items = localStorage.getItem(Favorites.LS_KEY)
    const total = items ? items.length : 0
    const testTotal = Favorites.getTotal()
    if (!total) return expect(testTotal).toBe(0)
    expect(total === testTotal).toBeTruthy()
  })
})
