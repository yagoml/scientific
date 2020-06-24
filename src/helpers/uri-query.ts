import queryString from 'query-string'
import { ArticlesFilters } from '../store/ducks/articles/types'

// Uri query params helper

/**
 * Convert query string param to `number`
 * @param queryString Query string value
 */
export const queryToInt = (queryString: string | string[]) => {
  return parseInt(queryString.toString())
}

/**
 * Get current query params
 */
export const getQuery = (search?: string) => {
  return queryString.parse(search ? search : window.location.search)
}

/**
 * Get current page number query
 */
export const getQueryPage = (search?: string) => {
  const filters = getQuery(search)
  return filters.page ? parseInt(filters.page.toString()) : 1
}

/**
 * Parse filters to uri query
 * @param filters Filters data
 */
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
