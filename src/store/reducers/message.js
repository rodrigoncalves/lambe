import {SET_MESSAGE} from '../actions/actionTypes'

const initialState = {
  title: '',
  msg: '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return {
        ...state,
        title: action.payload.title,
        msg: action.payload.msg,
      }
    default:
      return state
  }
}
