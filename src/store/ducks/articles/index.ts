import { ArticlesState, ArticlesTypes } from './types'
import { Reducer } from 'redux'

const INITIAL_STATE: ArticlesState = {
  data: [],
  total: 0,
  loading: false,
  error: false,
  filters: {
    terms: '',
    page: 1
  }
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
        data: action.payload.data,
        total: action.payload.total
      }
    case ArticlesTypes.ARTICLES_FAILURE:
      return { ...state, loading: false, error: true, data: [] }
    case ArticlesTypes.SET_FILTERS:
      return { ...state, filters: action.payload }
    default:
      return state
  }
}

export default reducer
