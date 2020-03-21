import {SET_MESSAGE} from './actionTypes'

export const setMessage = message => ({
  type: SET_MESSAGE,
  payload: message,
})
