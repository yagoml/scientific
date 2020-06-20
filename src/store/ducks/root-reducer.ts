import { combineReducers } from 'redux'
import articles from './articles'
import favorites from './favorites'

export default combineReducers({
  articles,
  favorites
})
