import { compose } from 'redux'
import { connect } from 'react-redux'
import { Initable } from 'reax'

import BscEdt from '../containers/BscEdt.js'
import actions from '../actions/shwScrEdt.js'

export default compose(
  Initable({
    loadFn: (state, props) => actions.load(props.data, props.readonly),
    loadingFn: () => false
  }),
  connect(
    (state) => {
      return {
        editingType: 'shwScrEdt',
        invalid: !state.getIn(['layoutMgt', 'bscEdt']).validate()
      }
    }
  ),
)(BscEdt)
