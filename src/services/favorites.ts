// Local storage key
const LS_KEY = 'scientific_favorites'
const PER_PAGE = 7

// Favorite articles service

/**
 * Get items from local storage
 * @param page Page
 */
export const getItems = (page?: number) => {
  const items = localStorage.getItem(LS_KEY)
  if (!items) return []
  if (!page) return JSON.parse(items)
  const startIndex = PER_PAGE * (page - 1)
  return JSON.parse(items).reverse().splice(startIndex, PER_PAGE)
}

/**
 * Set favorite articles
 * @param items Articles
 */
export const setFavorites = (items: string[]) => {
  localStorage.setItem(LS_KEY, JSON.stringify(items))
}

/**
 * Get total of favorite articles
 */
export const getTotal = () => {
  const items = getItems()
  return items.length
}

export default {}
