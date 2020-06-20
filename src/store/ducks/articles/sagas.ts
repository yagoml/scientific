import { articlesSuccess, articlesFailed } from './actions'
import axios, { AxiosRequestConfig } from 'axios'
import { call, put } from 'redux-saga/effects'
import { LoadRequestPayload } from './types'

/**
 * Core API key
 */
const apiKey = 'Hu1ApJ4YcW9POS5LjzZqXa6tlsMFKrGn'
/**
 * Core API url
 */
const apiUrl = 'https://core.ac.uk:443/api-v2/articles/search?apiKey=' + apiKey
/**
 * Axios request config
 */
const config: AxiosRequestConfig = {
  method: 'post',
  url: apiUrl
}
/**
 * Fields to search terms on Core API
 */
const searchableFields = ['title', 'authors', 'description']

/**
 * Request: Search for articles
 */
export function* searchArticles({ payload }: LoadRequestPayload) {
  const apiCall = async () => {
    config.data = JSON.stringify([{ fields: searchableFields, query: payload }])
    return axios(config)
      .then(response => response.data[0])
      .catch(error => {
        throw error
      })
  }

  try {
    const response = yield call(apiCall)
    yield put(articlesSuccess(response.data))
  } catch (e) {
    yield put(articlesFailed())
  }
}
