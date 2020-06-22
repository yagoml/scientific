import { AxiosRequestConfig } from 'axios'

/**
 * Core API key
 */
const apiKey = 'Hu1ApJ4YcW9POS5LjzZqXa6tlsMFKrGn'
/**
 * Core API url
 */
const apiUrl = 'https://core.ac.uk:443/api-v2/articles/'

export default {
  /**
   * Get config for `axios` request in Core API.
   * @param params Request data
   */
  getRequestConfig(params: any): AxiosRequestConfig {
    return {
      method: 'post',
      url: `${apiUrl}${params.path}?apiKey=${apiKey}`,
      data: params.data
    }
  }
}
