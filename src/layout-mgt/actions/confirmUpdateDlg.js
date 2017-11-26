import { fromTypes } from 'reax'

import actions from '../../actions/ActionTypes.js'
import stripKey from '../../common/stripKey.js'
import { getUpdateDetails } from '../../apis/plans.js'
import { closeDialog } from '../../dialog/actions.js'

const acs = fromTypes(actions, stripKey('LAYOUT_MGT_CONFIRM_UPDATE_DLG_'))

function load(id) {
  return async (dispatch) => {
    try {
      const resp = await getUpdateDetails(id)
      dispatch(acs.init(resp.result))
    } catch (e) {
      closeDialog()
    }
  }
}

function confirm() {
  return dispatch => {
    dispatch(closeDialog(true))
  }
}

function cancel() {
  return dispatch => {
    dispatch(closeDialog())
  }
}

export default {
  ...acs,
  load,
  confirm,
  cancel,
}
