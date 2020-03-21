import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  LOADING_USER,
  USER_LOADED,
} from './actionTypes'
import Axios from 'axios'

const authBaseURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
const API_KEY = 'AIzaSyDLQ8v0xYBAbTcy7iDUTRNSyxpBzQd0ZFI'

export const userLogged = user => ({
  type: USER_LOGGED_IN,
  payload: user,
})

export const logout = () => ({type: USER_LOGGED_OUT})

export const createUser = user => {
  return dispatch => {
    Axios.post(`${authBaseURL}/signupNewUser?key=${API_KEY}`, {
      email: user.email,
      password: user.password,
      returnSecureToken: true,
    })
      .catch(err => console.error(err))
      .then(res => {
        if (res.data.localId) {
          Axios.put(`/users/${res.data.localId}.json`, {
            name: user.name,
          })
            .catch(err => console.error(err))
            .then(res => {
              dispatch(login(user))
            })
        }
      })
  }
}

export const loadingUser = () => ({type: LOADING_USER})

export const userLoaded = () => ({type: USER_LOADED})

export const login = user => {
  return dispatch => {
    dispatch(loadingUser())

    Axios.post(`${authBaseURL}/verifyPassword?key=${API_KEY}`, {
      email: user.email,
      password: user.password,
      returnSecureToken: true,
    })
      .catch(err => console.error(err))
      .then(res => {
        if (res.data.localId) {
          Axios.get(`/users/${res.data.localId}.json`)
            .catch(err => console.error(err))
            .then(_ => {
              user.password = null
              user.name = res.data.name
              dispatch(userLogged(user))
              dispatch(userLoaded(user))
            })
        }
      })
  }
}
