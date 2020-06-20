import { action } from 'typesafe-actions'
import { ArticlesTypes, Article } from './types'

export const loadRequest = (query: string) =>
  action(ArticlesTypes.LOAD_REQUEST, query)

export const loadSuccess = (data: Article[]) =>
  action(ArticlesTypes.LOAD_SUCCESS, data)

export const loadFailure = () => action(ArticlesTypes.LOAD_FAILURE)
