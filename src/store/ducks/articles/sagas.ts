import { articlesSuccess, articlesFailed } from './actions'
import axios from 'axios'
import { call, put } from 'redux-saga/effects'
import { FetchArticlesAction } from './types'
import Core from '../../../services/core'

/**
 * Fields to search terms on Core API
 */
const searchableFields = ['title', 'authors', 'description']

/**
 * Request: Search for articles
 */
export function* searchArticles({ payload }: FetchArticlesAction) {
  const apiCall = async () => {
    const config = Core.requestConfig({
      path: 'search',
      data: JSON.stringify([
        {
          fields: searchableFields,
          query: payload.query,
          page: payload.page
        }
      ])
    })
    return axios(config)
      .then(response => response.data[0])
      .catch(error => {
        throw error
      })
  }

  try {
    const response = yield call(apiCall)
    yield put(
      articlesSuccess({
        data: response.data,
        total: response.totalHits
      })
    )
  } catch (e) {
    yield put(articlesFailed())
  }
}
