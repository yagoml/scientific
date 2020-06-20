import { AddFavoriteAction, RemoveFavoriteAction } from './types'
import { put } from 'redux-saga/effects'
import { favoritesSuccess } from './actions'

const LS_KEY = 'scientific_favorites'

export function* fetchFavorites() {
  try {
    yield put(favoritesSuccess(getItems()))
  } catch (e) {
    return console.error(e)
  }
}

/**
 * Save article as favorite
 */
export function* addFavorite({ payload }: AddFavoriteAction) {
  try {
    const lsItems = getItems()
    if (!lsItems.length) setFavorites([payload])
    else if (!lsItems.includes(payload)) {
      lsItems.push(payload)
      setFavorites(lsItems)
    }
    yield put(favoritesSuccess(getItems()))
  } catch (e) {
    return console.error(e)
  }
}

export function* removeFavorite({ payload }: RemoveFavoriteAction) {
  try {
    const lsItems = getItems()
    if (lsItems.length) {
      const index = lsItems.indexOf(payload)
      if (index >= 0) {
        lsItems.splice(index, 1)
        setFavorites(lsItems)
      }
    }
    yield put(favoritesSuccess(getItems()))
  } catch (e) {
    return console.error(e)
  }
}

const setFavorites = (items: string[]) => {
  localStorage.setItem(LS_KEY, JSON.stringify(items))
}

const getItems = () => {
  const items = localStorage.getItem(LS_KEY)
  if (!items) return []
  return JSON.parse(items)
}
