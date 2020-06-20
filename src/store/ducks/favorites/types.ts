/**
import { addFavorite } from './sagas';
 * Action types
 */
export enum FavoritesTypes {
  FETCH_FAVORITES = '@favorites/FETCH_FAVORITES',
  FAVORITES_SUCCESS = '@favorites/FAVORITES_SUCCESS',
  FAVORITES_FAILURE = '@favorites/FAVORITES_FAILURE',
  ADD_FAVORITE = '@favorites/ADD_FAVORITE'
}

export interface AddFavoriteAction {
  type: typeof FavoritesTypes.ADD_FAVORITE
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

/**
 * State type
 */
export interface FavoritesState {
  readonly data: Article[]
  readonly loading: boolean
  readonly error: boolean
}
