import { createStore, Store, applyMiddleware } from 'redux'
import { ArticlesState } from './ducks/articles/types'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './ducks/root-reducer'
import rootSaga from './ducks/root-saga'
import { FavoritesState } from './ducks/favorites/types'

export interface ApplicationState {
  articles: ArticlesState
  favorites: FavoritesState
}

const sagaMiddleware = createSagaMiddleware()

const store: Store<ApplicationState> = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

export default store
