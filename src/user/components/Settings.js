import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import SubNav from '../../components/SubNav.js'
import urls from '../../urls.js'

const links = [
  { text: '修改密码', url: urls.userSettingsPwd() },
]
export default class Settings extends PureComponent {
  render() {
    const { children } = this.props

    return (
      <div className="column">
        <div className="tile is-ancestor is-vertical">
          <div className="tile is-child">
            <SubNav links={links} />
          </div>
          <div className="tile is-child">
            {children}
          </div>
        </div>
      </div>
    )
  }
}

Settings.propTypes = {
  children: PropTypes.node,
}
