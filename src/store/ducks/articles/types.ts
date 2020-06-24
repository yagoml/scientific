/**
 * Action types
 */
export enum ArticlesTypes {
  FETCH_ARTICLES = '@articles/FETCH_ARTICLES',
  ARTICLES_SUCCESS = '@articles/ARTICLES_SUCCESS',
  ARTICLES_FAILURE = '@articles/ARTICLES_FAILURE',
  SET_FILTERS = '@articles/SET_FILTERS',
  CLEAN_FILTERS = '@articles/CLEAN_FILTERS'
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
  description?: string
  types: string[]
  downloadUrl: string
  datePublished?: string
  publisher?: string
  language?: ArticleLanguage
  year?: number
  topics?: string[]
}

export interface ArticleLanguage {
  code: string
  id: number
  name: string
}

export interface ArticlesData {
  data: Article[]
  total: number
}

export interface ArticlesFilters {
  [key: string]: string | number | (number | undefined)
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
  readonly empty: boolean
  readonly filters: ArticlesFilters
}
