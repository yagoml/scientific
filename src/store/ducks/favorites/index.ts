import { FavoritesTypes } from './types'
import { Reducer } from 'redux'

const INITIAL_STATE: string[] = []

const reducer: Reducer<string[]> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FavoritesTypes.FAVORITES_SUCCESS:
      return action.payload
    default:
      return state
  }
}

export default reducer
