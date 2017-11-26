import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { NavLink, withRouter } from 'react-router-dom'
import classnames from 'classnames'

class Aside extends PureComponent {
  render() {
    const { groups, className } = this.props
    return (
      <aside className={classnames('menu', className)}>
        { groups.map(g => [
          g.label && <p key="1" className="menu-label">{g.label}</p>,
          <ul key="2" className="menu-list">
            { g.links.map((l, idx) => (
              <li key={idx}><NavLink to={l.url} activeClassName="is-active">{l.text}</NavLink></li>
            )) }
          </ul>
        ])}
      </aside>
    )
  }
}

Aside.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      url: PropTypes.string,
    })).isRequired,
  })).isRequired,
  className: PropTypes.string,
}

export default withRouter(Aside)
