import {ADD_COMMENT} from './actionTypes'
import Axios from 'axios'

export const addPost = post => {
  return dispatch => {
    Axios.post('/posts.json', {...post})
      .then(res => console.log(res))
      .catch(err => console.error(err))
  }
}

export const addComment = comment => ({
  type: ADD_COMMENT,
  payload: comment,
})
