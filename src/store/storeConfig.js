import {createStore, combineReducers} from 'redux'
import userReducer from './reducers/user'
import postReducer from './reducers/posts'

const reducers = combineReducers({
  user: userReducer,
  posts: postReducer,
})

export default () => createStore(reducers)
