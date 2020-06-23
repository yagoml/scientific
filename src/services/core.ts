import { AxiosRequestConfig } from 'axios'
import { ArticlesFilters } from '../store/ducks/articles/types'

/**
 * Core API key
 */
const apiKey = 'Hu1ApJ4YcW9POS5LjzZqXa6tlsMFKrGn'
/**
 * Core API url
 */
const apiUrl = 'https://core.ac.uk:443/api-v2/articles/'

/**
 * Get config for `axios` request in Core API.
 * @param params Request data
 */
export const requestConfig = (params: any): AxiosRequestConfig => {
  const config: AxiosRequestConfig = {
    method: 'post',
    url: `${apiUrl}${params.path}?apiKey=${apiKey}`
  }
  delete params.path
  return { ...config, ...params }
}

export const buildSearchQuery = (filters: ArticlesFilters) => {
  const { terms, startYear, finishYear } = filters
  let query = ''
  let prevParam = false
  const and = (prev: boolean) => (prev ? ' AND ' : '')

  if (terms?.length) {
    query = terms
    prevParam = true
  }
  if (startYear) {
    query += and(prevParam) + 'year:>=' + startYear
    prevParam = true
  }
  if (finishYear) query += and(prevParam) + 'year:<=' + finishYear
  return query
}

export default {}
