import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import ModelListFilters from '../containers/ModelListFilters'
import ModelList from '../containers/ModelList'
import LayoutTopView from '../containers/LayoutTopView'

export default class Layout extends PureComponent {
  render() {
    const { display } = this.props

    return (
      <div className="column is-10 is-size-7">
        <ModelListFilters />
        {
          display === 'table' && <ModelList />
        }
        {
          display === 'view' && <LayoutTopView />
        }
      </div>
    )
  }
}

Layout.propTypes = {
  display: PropTypes.string.isRequired,
}
