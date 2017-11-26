import { fromTypes } from 'reax'

import actions from '../../actions/ActionTypes.js'

import stripKey from '../../common/stripKey.js'

const bscActions = fromTypes(actions, stripKey('LAYOUT_MGT_MODEL_EDITING_BSC_'))

function load(data, readonly=false) {
  return (dispatch) => {
    dispatch(bscActions.init({...data, readonly}))
  }
}

export default {
  ...bscActions,
  load,
}
