import {ADD_POST, ADD_COMMENT} from './actionTypes'

export const addPost = post => ({
  type: ADD_POST,
  payload: post,
})

export const addComment = comment => ({
  type: ADD_COMMENT,
  payload: comment,
})
