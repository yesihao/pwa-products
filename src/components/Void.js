import { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class Void extends PureComponent {
  render() {
    const { children } = this.props

    return children
  }
}

Void.propTypes = {
  children: PropTypes.node.isRequired,
}
