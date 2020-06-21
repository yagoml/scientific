/**
 * Action types
 */
export enum ArticlesTypes {
  FETCH_ARTICLES = '@articles/FETCH_ARTICLES',
  ARTICLES_SUCCESS = '@articles/ARTICLES_SUCCESS',
  ARTICLES_FAILURE = '@articles/ARTICLES_FAILURE'
}

export interface FetchArticlesPayload {
  query: string
  page: number
}

export interface FetchArticlesAction {
  type: typeof ArticlesTypes.FETCH_ARTICLES
  payload: FetchArticlesPayload
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

export interface ArticlesData {
  data: Article[]
  total: number
}

export interface QueryUri {
  terms?: string
  page?: number
  startYear?: number
  finishYear?: number
}

/**
 * State type
 */
export interface ArticlesState {
  readonly data: Article[]
  readonly total: number
  readonly loading: boolean
  readonly error: boolean
}
