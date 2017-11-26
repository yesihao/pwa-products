import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector, createSelector } from 'reselect'
import { Initable } from 'reax'

import CntEdt from '../components/CntEdt.js'
import actions from '../actions/cntEdt.js'

const selector = createStructuredSelector({
  rows: createSelector(
    x => x.get('rows'),
    rows => rows.toJS()
  ),
  totalRows: x => x.get('rows').size,
  category: x => x.get('category'),
})

export default compose(
  Initable({
    loadFn: (_, props) => actions.load(props.data, props.readonly),
    loadingFn: () => false
  }),
  connect(
    (state) => {
      const layoutMgt = state.get('layoutMgt')
      const bscEdt = layoutMgt.get('bscEdt')
      const cntEdt = layoutMgt.get('cntEdt')
      return {
        ...selector(cntEdt),
        invalid: !bscEdt.validate() || !cntEdt.validate()
      }
    },
    actions,
  )
)(CntEdt)
