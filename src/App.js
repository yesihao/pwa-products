import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Router, Route, Switch, Redirect } from 'react-router-dom'

import loadable from './common/loadable'
const MLayout = loadable(() => import(
  /* webpackChunkName: "MLayout" */
  './components/MLayout.js'
))
const Products = loadable(() => import(
  /* webpackChunkName: "Products" */
  './containers/Products.js'
))

export default class App extends PureComponent {
  render() {
    const { store, history } = this.props
    return (
      <Provider store={store}>
        <Router history={history}>
          <MLayout>
            <Switch>
              <Route exact path="/" component={Products} />
              <Redirect to="/" />
            </Switch>
          </MLayout>
        </Router>
      </Provider>
    )
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}
