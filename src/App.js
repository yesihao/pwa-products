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
const Product = loadable(() => import(
  /* webpackChunkName: "Product" */
  './containers/Product.js'
))

export default class App extends PureComponent {
  render() {
    const { store, history } = this.props
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" render={props => (
            <MLayout {...props}>
              <Switch>
                <Route exact path="/product/:id" component={Product} />
                <Route exact path="/products" component={Products} />
                <Redirect to="/products" />
              </Switch>
            </MLayout>
          )} />
        </Router>
      </Provider>
    )
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}
