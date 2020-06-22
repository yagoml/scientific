/**
 * Action types
 */
export enum FavoritesTypes {
  FETCH_FAVORITES_IDS = '@favorites/FETCH_FAVORITES_IDS',
  FETCH_FAVORITES = '@favorites/FETCH_FAVORITES',
  FAVORITES_SUCCESS = '@favorites/FAVORITES_SUCCESS',
  FAVORITES_FAILED = '@favorites/FAVORITES_FAILED',
  FAVORITES_IDS_SUCCESS = '@favorites/FAVORITES_IDS_SUCCESS',
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

/**
 * State types
 */
export interface FavoritesState {
  ids: string[]
  articles: Article[]
  total: number
  loading: boolean
  error: boolean
}
