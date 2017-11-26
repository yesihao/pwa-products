import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import classnames from 'classnames'

import styles from './SubNav.scss'

export default class SubNav extends PureComponent {
  render() {
    const { links, className } = this.props
    return (
      <div className={classnames('navbar', 'has-shadow', className)}>
        <ul className="navbar-menu">
          {
            links.map((l, idx) =>
              <li key={idx} className="navbar-item">
                <NavLink to={l.url} activeClassName={styles.active} className="navbar-item">{l.text}</NavLink>
              </li>
            )
          }
        </ul>
      </div>
    )
  }
}

SubNav.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    url: PropTypes.string,
  })).isRequired,
  className: PropTypes.string,
}
