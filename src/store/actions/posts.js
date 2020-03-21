import {SET_POSTS, CREATING_POST, POST_CREATED} from './actionTypes'
import Axios from 'axios'
import {setMessage} from './message'

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
      .catch(err => {
        console.log(err)
        dispatch(
          setMessage({
            title: 'Erro',
            msg: 'Ocorreu um erro inesperado!',
          }),
        )
      })
      .then(resp => {
        post.image = resp.data.imageUrl
        Axios.post('/posts.json', {...post})
          .catch(err => {
            console.log(err)
            dispatch(
              setMessage({
                title: 'Erro',
                msg: 'Ocorreu um erro inesperado!',
              }),
            )
          })
          .then(res => {
            dispatch(fetchPosts())
            dispatch(postCreated())
            dispatch(
              setMessage({
                title: 'Sucesso',
                msg: 'Nova postagem!',
              }),
            )
          })
      })
  }
}

export const addComment = payload => {
  return dispatch => {
    Axios.get(`/posts/${payload.postId}.json`)
      .catch(err => {
        console.log(err)
        dispatch(
          setMessage({
            title: 'Erro',
            msg: 'Ocorreu um erro inesperado!',
          }),
        )
      })
      .then(res => {
        const comments = res.data.comments || []
        comments.push(payload.comment)
        Axios.patch(`/posts/${payload.postId}.json`, {comments})
          .catch(err => {
            console.log(err)
            dispatch(
              setMessage({
                title: 'Erro',
                msg: 'Ocorreu um erro inesperado!',
              }),
            )
          })
          .then(_ => {
            dispatch(fetchPosts())
          })
      })
  }
}

export const setPosts = posts => ({
  type: SET_POSTS,
  payload: posts,
})

export const fetchPosts = () => {
  return dispatch => {
    Axios.get('/posts.json')
      .catch(err => {
        console.log(err)
        dispatch(
          setMessage({
            title: 'Erro',
            msg: 'Ocorreu um erro inesperado!',
          }),
        )
      })
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
