import { action } from 'typesafe-actions'
import { ArticlesTypes, ArticlesData, FetchArticlesPayload } from './types'

export const fetchArticles = (params: FetchArticlesPayload) =>
  action(ArticlesTypes.FETCH_ARTICLES, params)

export const articlesSuccess = (articles: ArticlesData) =>
  action(ArticlesTypes.ARTICLES_SUCCESS, articles)

export const articlesFailed = () => action(ArticlesTypes.ARTICLES_FAILURE)
