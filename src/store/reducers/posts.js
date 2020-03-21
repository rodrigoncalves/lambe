import {SET_POSTS, ADD_COMMENT} from '../actions/actionTypes'

const initialState = {
  posts: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
      }
    case ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.payload.postId) {
            const comments = post.comments || []
            post.comments = comments.concat(action.payload.comment)
          }
          return post
        }),
      }
    default:
      return state
  }
}
