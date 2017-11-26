import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import styles from './MLayout.scss'

export default class MLayout extends PureComponent {
  render() {
    const { children } = this.props
    return (
      <div className={styles.container}>
        {children}
      </div>
    )
  }
}

MLayout.propTypes = {
  children: PropTypes.node,
}
