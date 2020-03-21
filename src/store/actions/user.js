import {USER_LOGGED_IN, USER_LOGGED_OUT} from './actionTypes'
import Axios from 'axios'

const authBaseURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
const API_KEY = 'AIzaSyDLQ8v0xYBAbTcy7iDUTRNSyxpBzQd0ZFI'

export const login = user => ({
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
