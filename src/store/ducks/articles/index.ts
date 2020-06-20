import { ArticlesState, ArticlesTypes } from './types'
import { Reducer } from 'redux'

const INITIAL_STATE: ArticlesState = {
  data: [],
  loading: false,
  error: false
}

const reducer: Reducer<ArticlesState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ArticlesTypes.FETCH_ARTICLES:
      return { ...state, loading: true }
    case ArticlesTypes.ARTICLES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload
      }
    case ArticlesTypes.ARTICLES_FAILURE:
      return { ...state, loading: false, error: true, data: [] }
    default:
      return state
  }
}

export default reducer
