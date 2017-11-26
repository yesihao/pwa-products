import React from 'react'
import { fromTypes } from 'reax'

import actions from '../../actions/ActionTypes.js'
import stripKey from '../../common/stripKey.js'
import { getAll, update } from '../../apis/plans.js'
import { notify } from '../../notify/actions.js'
import { openDialog } from '../../dialog/actions.js'
import ConfirmUpdateDlg from '../containers/ConfirmUpdateDlg.js'

const showallActions = fromTypes(actions, stripKey('LAYOUT_MGT_SHOW_ALL_'))

function load() {
  return async function (dispatch) {
    try {
      const resp = await getAll()
      dispatch(showallActions.init(resp.result.plans))
    } catch (e) {
      dispatch(notify('载入方案失败', 'danger'))
      throw e
    }
  }
}

function submit(id, ensure=false) {
  return async function (dispatch) {
    if (ensure && !await dispatch(openDialog(<ConfirmUpdateDlg id={id} />))) {
      return
    }

    try {
      const resp = await update(id)
      dispatch(showallActions.reloadPlan(id, resp.result))
    } catch (e) {
      dispatch(notify('上线或更新失败', 'danger'))
      throw e
    }
  }
}

export default {
  ...showallActions,
  load,
  submit,
}
