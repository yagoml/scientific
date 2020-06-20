import { action } from 'typesafe-actions'
import { ArticlesTypes, Article } from './types'

export const loadRequest = (query: string) =>
  action(ArticlesTypes.FETCH_ARTICLES, query)

export const loadSuccess = (data: Article[]) =>
  action(ArticlesTypes.ARTICLES_SUCCESS, data)

export const loadFailure = () => action(ArticlesTypes.ARTICLES_FAILURE)
