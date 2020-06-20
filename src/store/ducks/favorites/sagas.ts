import { AddFavoriteAction } from './types'

const LS_KEY = 'scientific_favorites'

/**
 * Save article as favorite
 */
export function addFavorite({ payload }: AddFavoriteAction) {
  try {
    const lsItems = localStorage.getItem(LS_KEY)
    if (!lsItems) return localStorage.setItem(LS_KEY, JSON.stringify([payload]))
    const items = JSON.parse(lsItems)
    if (!items.includes(payload)) {
      items.push(payload)
      localStorage.setItem(LS_KEY, JSON.stringify(items))
    }
  } catch (e) {
    return console.error(e)
  }
}

export function removeFavorite({ payload }: AddFavoriteAction) {}
