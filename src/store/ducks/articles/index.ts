import { ArticlesState, ArticlesTypes } from './types'
import { Reducer } from 'redux'

const INITIAL_STATE: ArticlesState = {
  data: [],
  loading: false,
  error: false
}

const reducer: Reducer<ArticlesState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ArticlesTypes.LOAD_REQUEST:
      return { ...state, loading: true }
    case ArticlesTypes.LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload
      }
    case ArticlesTypes.LOAD_FAILURE:
      return { ...state, loading: false, error: true, data: [] }
    default:
      return state
  }
}

export default reducer
