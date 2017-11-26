import { fromTypes } from 'reax'

import actions from '../../actions/ActionTypes.js'
import stripKey from '../../common/stripKey.js'
import { closeDrawer } from '../../drawer/actions.js'

const commonActions = fromTypes(actions, stripKey('LAYOUT_MGT_MODEL_EDITING_COMMON_'))

function save(mounted) {
  return function (dispatch, getState) {
    const state = getState().get('layoutMgt')
    const basic = state.get('bscEdt')
    const derived = state.get(mounted)

    dispatch(closeDrawer({
      ...basic.dump(),
      ...derived.dump()
    }))
  }
}

function cancel() {
  return function (dispatch) {
    dispatch(closeDrawer())
  }
}

export default {
  ...commonActions,
  save,
  cancel,
}
