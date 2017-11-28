import React from 'react'
import { render } from 'react-dom'
import './polyfill'

import App from './App'

import 'normalize.css'
import './assets/styles/bulma.scss'
import './assets/styles/app.scss'

import store from './store'
import history from './history'

render(
  <App store={store} history={history} />,
  document.getElementById('root')
)
