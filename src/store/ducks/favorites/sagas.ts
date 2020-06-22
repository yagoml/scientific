import { AddFavoriteAction, RemoveFavoriteAction } from './types'
import { call, put } from 'redux-saga/effects'
import {
  favoritesIDsSuccess,
  favoritesSuccess,
  favoritesFailed
} from './actions'
import Core from '../../../services/core'
import axios from 'axios'

const LS_KEY = 'scientific_favorites'

/**
 * Request: Search for articles
 */
export function* fetchFavorites() {
  const apiCall = async () => {
    const config = Core.getRequestConfig({
      path: 'get',
      data: JSON.stringify(getItems())
    })
    return axios(config)
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  }

  try {
    const response = yield call(apiCall)
    const data: any[] = []
    response.map((r: any) => data.push(r.data))
    yield put(
      favoritesSuccess({
        data: data,
        total: response.length
      })
    )
  } catch (e) {
    yield put(favoritesFailed())
  }
}

export function* fetchFavoritesIDs() {
  try {
    yield put(favoritesIDsSuccess(getItems()))
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
    yield put(favoritesIDsSuccess(getItems()))
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
    yield put(favoritesIDsSuccess(getItems()))
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
