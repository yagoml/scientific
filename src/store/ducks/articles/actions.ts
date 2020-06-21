import { action } from 'typesafe-actions'
import {
  ArticlesTypes,
  ArticlesData,
  FetchArticlesPayload,
  ArticlesFilters
} from './types'

export const fetchArticles = (params: FetchArticlesPayload) =>
  action(ArticlesTypes.FETCH_ARTICLES, params)

export const articlesSuccess = (articles: ArticlesData) =>
  action(ArticlesTypes.ARTICLES_SUCCESS, articles)

export const articlesFailed = () => action(ArticlesTypes.ARTICLES_FAILURE)

export const setFilters = (filters: ArticlesFilters) =>
  action(ArticlesTypes.SET_FILTERS, filters)
