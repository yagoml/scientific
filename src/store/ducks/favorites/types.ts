/**
import { addFavorite } from './sagas';
 * Action types
 */
export enum FavoritesTypes {
  FETCH_FAVORITES = '@favorites/FETCH_FAVORITES',
  FAVORITES_SUCCESS = '@favorites/FAVORITES_SUCCESS',
  ADD_FAVORITE = '@favorites/ADD_FAVORITE',
  REMOVE_FAVORITE = '@favorites/REMOVE_FAVORITE'
}

export interface AddFavoriteAction {
  type: typeof FavoritesTypes.ADD_FAVORITE
  payload: string
}

export interface RemoveFavoriteAction {
  type: typeof FavoritesTypes.REMOVE_FAVORITE
  payload: string
}

/**
 * Data types
 */

export interface Article {
  id: string
  title: string
  authors: string[]
  description: string
  types: string[]
  downloadUrl: string
}
