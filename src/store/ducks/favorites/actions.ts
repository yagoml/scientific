import { action } from 'typesafe-actions'
import { FavoritesTypes } from './types'

export const fetchFavorites = () => action(FavoritesTypes.FETCH_FAVORITES)

export const favoritesSuccess = (favorites: string[]) =>
  action(FavoritesTypes.FAVORITES_SUCCESS, favorites)

export const addFavorite = (id: string) =>
  action(FavoritesTypes.ADD_FAVORITE, id)

export const removeFavorite = (id: string) =>
  action(FavoritesTypes.REMOVE_FAVORITE, id)
