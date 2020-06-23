import queryString from 'query-string'
import { ArticlesFilters } from '../store/ducks/articles/types'

export const queryToInt = (queryString: string | string[]) => {
  return parseInt(queryString.toString())
}

export const getQuery = () => {
  return queryString.parse(window.location.search)
}

export const getPage = () => {
  const query = getQuery()
  return query.page ? parseInt(query.page.toString()) : 1
}

export const buildUriQuery = (filters: ArticlesFilters) => {
  const params: ArticlesFilters = {}
  if (filters.terms?.length) params.terms = filters.terms
  if (filters.startYear) params.startYear = filters.startYear
  if (filters.finishYear) params.finishYear = filters.finishYear
  return queryString.stringify(params)
}

export default {}
