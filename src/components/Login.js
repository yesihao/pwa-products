import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './Login.scss'

export default class Login extends PureComponent {
  componentWillUnmount() {
    this.props.unload()
  }

  render() {
    const {
      mobile, password, error,
      chgMobile, chgPasswd, login,
    } = this.props

    return (
      <div>
      2424
        <select className="select">
          <option>43</option>
        </select>
      </div>
    )
  }
}

Login.propTypes = {
  mobile: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,

  chgMobile: PropTypes.func.isRequired,
  chgPasswd: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  unload: PropTypes.func.isRequired,
}

Login.defaultProps = {
  error: '　'
}
