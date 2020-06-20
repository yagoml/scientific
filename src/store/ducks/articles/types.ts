/**
 * Action types
 */
export enum ArticlesTypes {
  FETCH_ARTICLES = '@articles/FETCH_ARTICLES',
  ARTICLES_SUCCESS = '@articles/ARTICLES_SUCCESS',
  ARTICLES_FAILURE = '@articles/ARTICLES_FAILURE'
}

export interface LoadRequestPayload {
  type: typeof ArticlesTypes.FETCH_ARTICLES
  payload: string
}

/**
 * Data types
 */

export interface Article {
  id: string
  title: string
  authors: string[]
  description: string
  types: string[]
  downloadUrl: string
}

/**
 * State type
 */
export interface ArticlesState {
  readonly data: Article[]
  readonly loading: boolean
  readonly error: boolean
}
