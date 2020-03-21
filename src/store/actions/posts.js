import {ADD_COMMENT} from './actionTypes'
import Axios from 'axios'

export const addPost = post => {
  return dispatch => {
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
          .then(res => console.log(res))
          .catch(err => console.error(err))
      })
  }
}

export const addComment = comment => ({
  type: ADD_COMMENT,
  payload: comment,
})
