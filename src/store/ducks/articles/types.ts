/**
 * Action types
 */
export enum ArticlesTypes {
  LOAD_REQUEST = '@articles/LOAD_REQUEST',
  LOAD_SUCCESS = '@articles/LOAD_SUCCESS',
  LOAD_FAILURE = '@articles/LOAD_FAILURE'
}

export interface LoadRequestPayload {
  type: typeof ArticlesTypes.LOAD_REQUEST
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
