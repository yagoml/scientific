import { FavoritesState, FavoritesTypes } from './types'
import { Reducer } from 'redux'

const INITIAL_STATE: FavoritesState = {
  data: [],
  loading: false,
  error: false
}

const reducer: Reducer<FavoritesState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FavoritesTypes.FETCH_FAVORITES:
      return { ...state, loading: true }
    case FavoritesTypes.FAVORITES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload
      }
    case FavoritesTypes.FAVORITES_FAILURE:
      return { ...state, loading: false, error: true, data: [] }
    case FavoritesTypes.ADD_FAVORITE:
      return state
    default:
      return state
  }
}

export default reducer
