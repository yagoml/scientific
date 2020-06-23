import {
  AddFavoriteAction,
  RemoveFavoriteAction,
  FetchFavoritesAction
} from './types'
import { call, put } from 'redux-saga/effects'
import {
  favoritesIDsSuccess,
  favoritesSuccess,
  favoritesFailed
} from './actions'
import Core from '../../../services/core'
import axios from 'axios'
import FavoritesService from '../../../services/favorites'

/**
 * Request: Search for articles
 */
export function* fetchFavorites({ payload }: FetchFavoritesAction) {
  const apiCall = async (pageIDs: string[]) => {
    const config = Core.requestConfig({
      path: 'get',
      data: JSON.stringify(pageIDs)
    })
    return axios(config)
      .then(response => response.data)
      .catch(error => {
        throw error
      })
  }

  try {
    const pageIDs = FavoritesService.getItems(payload)
    let response = yield call(apiCall, pageIDs)
    const data: any[] = []
    response.map((r: any) => data.push(r.data))
    yield put(
      favoritesSuccess({
        data: data,
        total: FavoritesService.getTotal()
      })
    )
  } catch (e) {
    yield put(favoritesFailed())
  }
}

export function* fetchFavoritesIDs() {
  try {
    yield put(favoritesIDsSuccess(FavoritesService.getItems()))
  } catch (e) {
    return console.error(e)
  }
}

/**
 * Save article as favorite
 */
export function* addFavorite({ payload }: AddFavoriteAction) {
  try {
    const lsItems = FavoritesService.getItems()
    if (!lsItems.length) FavoritesService.setFavorites([payload])
    else if (!lsItems.includes(payload)) {
      lsItems.push(payload)
      FavoritesService.setFavorites(lsItems)
    }
    yield put(favoritesIDsSuccess(FavoritesService.getItems()))
  } catch (e) {
    return console.error(e)
  }
}

export function* removeFavorite({ payload }: RemoveFavoriteAction) {
  try {
    const lsItems = FavoritesService.getItems()
    if (lsItems.length) {
      const index = lsItems.indexOf(payload)
      if (index >= 0) {
        lsItems.splice(index, 1)
        FavoritesService.setFavorites(lsItems)
      }
    }
    yield put(favoritesIDsSuccess(FavoritesService.getItems()))
  } catch (e) {
    return console.error(e)
  }
}
