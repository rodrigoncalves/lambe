import React from 'react'
import {Provider} from 'react-redux'
import {AppRegistry} from 'react-native'
import {name as appName} from './app.json'
import App from './src/App'
import storeConfig from './src/store/storeConfig'
import Axios from 'axios'

Axios.defaults.baseURL = 'https://lambe-b6c2d.firebaseio.com/'

const store = storeConfig()
const Redux = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent(appName, () => Redux)
