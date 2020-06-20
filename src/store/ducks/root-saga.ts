import { all, takeLatest } from 'redux-saga/effects'
import { ArticlesTypes } from './articles/types'
import { searchArticles } from './articles/sagas'

export default function* rootSaga() {
  return yield all([takeLatest(ArticlesTypes.LOAD_REQUEST, searchArticles)])
}
