const LS_KEY = 'scientific_favorites'
const PER_PAGE = 7

const getItems = (page?: number) => {
  const items = localStorage.getItem(LS_KEY)
  if (!items) return []
  if (!page) return JSON.parse(items)
  const startIndex = PER_PAGE * (page - 1)
  return JSON.parse(items).reverse().splice(startIndex, PER_PAGE)
}

export default {
  getItems: getItems,

  setFavorites: (items: string[]) => {
    localStorage.setItem(LS_KEY, JSON.stringify(items))
  },

  getTotal: () => {
    const items = getItems()
    return items.length
  }
}
