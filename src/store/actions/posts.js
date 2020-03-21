import {
  ADD_COMMENT,
  SET_POSTS,
  CREATING_POST,
  POST_CREATED,
} from './actionTypes'
import Axios from 'axios'

export const addPost = post => {
  return dispatch => {
    dispatch(creatingPost())
    Axios({
      url: 'uploadImage',
      baseURL: 'https://us-central1-lambe-b6c2d.cloudfunctions.net',
      method: 'post',
      data: {
        image: post.image.base64,
      },
    })
      .catch(err => console.error(err))
      .then(resp => {
        post.image = resp.data.imageUrl
        Axios.post('/posts.json', {...post})
          .catch(err => console.error(err))
          .then(res => {
            dispatch(fetchPosts())
            dispatch(postCreated())
          })
      })
  }
}

export const addComment = comment => ({
  type: ADD_COMMENT,
  payload: comment,
})

export const setPosts = posts => ({
  type: SET_POSTS,
  payload: posts,
})

export const fetchPosts = () => {
  return dispatch => {
    Axios.get('/posts.json')
      .catch(err => console.error(err))
      .then(res => {
        const rawPosts = res.data
        const posts = []
        for (let key in rawPosts) {
          posts.push({
            ...rawPosts[key],
            id: key,
          })
        }

        // reverse: última postagem primeiro
        dispatch(setPosts(posts.reverse()))
      })
  }
}

export const creatingPost = () => ({
  type: CREATING_POST,
})

export const postCreated = () => ({
  type: POST_CREATED,
})
