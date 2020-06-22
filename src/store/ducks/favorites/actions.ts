import { action } from 'typesafe-actions'
import { FavoritesTypes } from './types'
import { ArticlesData } from '../articles/types'

export const fetchFavoritesIDs = () =>
  action(FavoritesTypes.FETCH_FAVORITES_IDS)

export const favoritesIDsSuccess = (ids: string[]) =>
  action(FavoritesTypes.FAVORITES_IDS_SUCCESS, ids)

export const fetchFavorites = () => action(FavoritesTypes.FETCH_FAVORITES)

export const favoritesSuccess = (articles: ArticlesData) =>
  action(FavoritesTypes.FAVORITES_SUCCESS, articles)

export const favoritesFailed = () => action(FavoritesTypes.FAVORITES_FAILED)

export const addFavorite = (id: string) =>
  action(FavoritesTypes.ADD_FAVORITE, id)

export const removeFavorite = (id: string) =>
  action(FavoritesTypes.REMOVE_FAVORITE, id)
