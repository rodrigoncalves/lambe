import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import userReducer from './reducers/user'
import postReducer from './reducers/posts'
import messageReducer from './reducers/message'
import thunk from 'redux-thunk'

const reducers = combineReducers({
  user: userReducer,
  posts: postReducer,
  message: messageReducer,
})

export default () => createStore(reducers, compose(applyMiddleware(thunk)))
