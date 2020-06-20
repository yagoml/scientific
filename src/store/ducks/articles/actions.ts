import { action } from 'typesafe-actions'
import { ArticlesTypes, Article } from './types'

export const fetchArticles = (query: string) =>
  action(ArticlesTypes.FETCH_ARTICLES, query)

export const articlesSuccess = (data: Article[]) =>
  action(ArticlesTypes.ARTICLES_SUCCESS, data)

export const articlesFailed = () => action(ArticlesTypes.ARTICLES_FAILURE)
