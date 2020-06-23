import { ArticlesState, ArticlesTypes } from './types'
import { Reducer } from 'redux'

const INITIAL_STATE: ArticlesState = {
  data: [],
  total: 0,
  loading: false,
  error: false,
  empty: false,
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
        total: action.payload.total,
        empty: action.payload.total === 0
      }
    case ArticlesTypes.ARTICLES_FAILURE:
      return { ...state, loading: false, error: true, data: [] }
    case ArticlesTypes.SET_FILTERS:
      return { ...state, filters: action.payload }
    case ArticlesTypes.CLEAN_FILTERS:
      return {
        ...state,
        data: [],
        total: 0,
        empty: false,
        filters: {
          terms: '',
          page: 1
        }
      }
    default:
      return state
  }
}

export default reducer
