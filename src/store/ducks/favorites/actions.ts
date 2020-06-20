import { action } from 'typesafe-actions'
import { FavoritesTypes, Article } from './types'

export const fetchFavorites = (query: string) =>
  action(FavoritesTypes.FETCH_FAVORITES, query)

export const fetchFavoritesSuccess = (data: Article[]) =>
  action(FavoritesTypes.FAVORITES_SUCCESS, data)

export const fetchFavoritesFailure = () =>
  action(FavoritesTypes.FAVORITES_FAILURE)

export const addFavorite = (id: string) =>
  action(FavoritesTypes.ADD_FAVORITE, id)
