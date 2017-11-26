import { PureComponent, createElement } from 'react'
import hoistStatics from 'hoist-non-react-statics'
import { getCookie } from 'tjs'
import isEqual from 'lodash-es/isEqual'
import PropTypes from 'prop-types'

import { check } from '../apis/login.js'
import urls from '../urls.js'
import history from '../history.js'

function Auth(WrappedComponent) {
  const connectDisplayName = `Auth(${WrappedComponent.displayName})`
  class Auth extends PureComponent {
    static propTypes = {
      location: PropTypes.object,
    }
    static displayName = connectDisplayName
    static WrappedComponent = WrappedComponent

    state = {
      authorized: false,
    }

    async componentDidMount() {
      const s = getCookie('s')
      if (s) {
        try {
          await this.check()
          this.setState({ authorized: true })
        } catch (e) {
          history.push(urls.login())
        }
      } else {
        history.push(urls.login())
      }
    }
    async componentWillReceiveProps(nextProps) {
      if (!isEqual(this.props.location, nextProps.location)) {
        try {
          await this.check()
        } catch (e) {
          history.push(urls.login())
        }
      }
    }

    check = async () => {
      if (this.checking) {
        return
      }
      try {
        this.checking = true
        await check()
      } catch (e) {
        throw e
      } finally {
        this.checking = false
      }
    }

    render() {
      return this.state.authorized && createElement(WrappedComponent, this.props)
    }
  }

  return hoistStatics(Auth, WrappedComponent)
}

export default Auth
