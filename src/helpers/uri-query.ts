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
  const { terms, startYear, finishYear, page } = filters
  if (terms?.length) params.terms = terms
  if (startYear) params.startYear = startYear
  if (finishYear) params.finishYear = finishYear
  if (page && page > 1) params.page = page
  return queryString.stringify(params)
}

export default {}
