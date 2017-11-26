import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { NavLink } from 'react-router-dom'

import styles from './Pwd.scss'
import urls from '../../urls.js'

export default class Pwd extends PureComponent {
  render() {
    const {
      oldPwd, newPwd, cfmPwd, error,
      chgOldPwd, chgNewPwd, chgCfmPwd, chgPwd
    } = this.props

    return (
      <div className="columns is-centered">
        <div className="column is-3">
          <div className="field">
            <span className="label">原密码：</span>
            <div className="control">
              <input className="input" type="password"
                placeholder="请填写原密码"
                value={oldPwd}
                onChange={e => chgOldPwd(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <span className="label">新密码：</span>
            <div className="control">
              <input className="input" type="password"
                placeholder="请填写新密码"
                value={newPwd}
                onChange={e => chgNewPwd(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <span className="label">确认密码：</span>
            <div className="control">
              <input className="input" type="password"
                placeholder="请再次填写新密码"
                value={cfmPwd}
                onChange={e => chgCfmPwd(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <span className="label has-text-weight-normal has-text-danger">{error}</span>
            <a className="button tile is-link is-outlined" onClick={chgPwd}>提交</a>
          </div>
        </div>
      </div>
    )
  }
}

Pwd.propTypes = {
  oldPwd: PropTypes.string.isRequired,
  newPwd: PropTypes.string.isRequired,
  cfmPwd: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,

  chgOldPwd: PropTypes.func.isRequired,
  chgNewPwd: PropTypes.func.isRequired,
  chgCfmPwd: PropTypes.func.isRequired,
  chgPwd: PropTypes.func.isRequired,
}

Pwd.defaultProps = {
  error: '　'
}
