import { FavoritesTypes, FavoritesState } from './types'
import { Reducer } from 'redux'

const INITIAL_STATE: FavoritesState = {
  ids: [],
  articles: [],
  total: 0,
  loading: false,
  error: false
}

const reducer: Reducer<FavoritesState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FavoritesTypes.FETCH_FAVORITES:
      return { ...state, loading: true }
    case FavoritesTypes.FAVORITES_IDS_SUCCESS:
      return { ...state, ids: action.payload }
    case FavoritesTypes.FAVORITES_SUCCESS:
      return {
        ...state,
        loading: false,
        articles: action.payload.data,
        total: action.payload.total
      }
    case FavoritesTypes.FAVORITES_FAILED:
      return { ...state, loading: false, error: true }
    default:
      return state
  }
}

export default reducer
