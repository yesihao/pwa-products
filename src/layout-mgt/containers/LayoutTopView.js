import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'

import LayoutTopView from '../components/LayoutTopView'
import actions from '../actions/layout'

const filteredModels = createSelector(
  x => x.get('models'),
  x => x.get('filters'),
  (models, filters) => {
    let filteredModels = models
    let { keyword, entrance, status, type } = filters.toJS()
    filteredModels = models
      .filter(m =>
        m.get('name').toLowerCase().indexOf(keyword) !== -1 &&
        (!entrance || m.get('entranceId') === entrance) &&
        (!status || m.get('status') === status) &&
        (!type || m.get('function') === type)
      )
    return filteredModels
  }
)
const measureScaleIndex = createSelector(
  x => x.getIn(['canvas', 'measureScaleIndex']),
  measureScaleIndex => measureScaleIndex
)
const measureScales = createSelector(
  x => x.getIn(['canvas', 'measureScales']),
  measureScales => measureScales.toJS()
)

const selector = createStructuredSelector({
  models: createSelector(
    filteredModels,
    filteredModels => filteredModels.toJS()
  ),
  canvasWidth: x => x.getIn(['canvas', 'width']),
  canvasHeight: x => x.getIn(['canvas', 'height']),
  clickedModel: x => x.getIn(['canvas', 'clickedModel']),
  measureScaleIndex,
  measureScales,
  measureScale: createSelector(
    measureScales,
    measureScaleIndex,
    (measureScales, measureScaleIndex) => measureScales[measureScaleIndex]
  ),
  measureScaleBase: x => x.getIn(['canvas', 'measureScaleBase']),
})

export default connect(
  (state) => {
    const layout = state.getIn(['layoutMgt', 'layout'])
    return selector(layout)
  },
  actions,
)(LayoutTopView)
