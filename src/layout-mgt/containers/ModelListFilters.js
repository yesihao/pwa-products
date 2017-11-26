import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'

import ModelListFilters from '../components/ModelListFilters'
import actions from '../actions/layout'

const { updateFilters, resetFilters } = actions

const selector = createStructuredSelector({
  name: x => x.get('name'),
  display: x => x.get('display'),
  type: x => x.get('type'),
  entrance: x => x.get('entrance'),
  entrances: createSelector(
    x => x.get('entrances'),
    entrances => entrances.map(etr => etr.delete('models')).toJS()
  ),
  status: x => x.get('status'),
})

export default connect(
  (state) => {
    const filters = state.getIn(['layoutMgt', 'layout', 'filters'])
    const entrances = state.getIn(['layoutMgt', 'layout', 'entrances'])

    return selector(filters.set('entrances', entrances))
  },
  {
    updateFilters,
    resetFilters
  }
)(ModelListFilters)
