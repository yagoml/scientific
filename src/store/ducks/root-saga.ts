import { all, takeLatest } from 'redux-saga/effects'
import { ArticlesTypes } from './articles/types'
import { FavoritesTypes } from './favorites/types'
import { searchArticles } from './articles/sagas'
import { addFavorite } from './favorites/sagas'

export default function* rootSaga() {
  return yield all([
    takeLatest(ArticlesTypes.FETCH_ARTICLES, searchArticles),
    takeLatest(FavoritesTypes.ADD_FAVORITE, addFavorite)
  ])
}
