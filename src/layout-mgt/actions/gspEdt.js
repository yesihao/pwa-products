import React from 'react'
import { fromTypes } from 'reax'

import actions from '../../actions/ActionTypes.js'
import stripKey from '../../common/stripKey.js'
import { openDialog } from '../../dialog/actions.js'
import SlctCponDlg from '../containers/SlctCponDlg.js'

const gashaponActions = fromTypes(actions, stripKey('LAYOUT_MGT_MODEL_EDITING_GASHAPON_'))
const bscActions = fromTypes(actions, stripKey('LAYOUT_MGT_MODEL_EDITING_BSC_'))

function load(data, readonly=false) {
  return dispatch => {
    dispatch(bscActions.init({ ...data, readonly }))
    dispatch(gashaponActions.init(data))
  }
}

function selectCoupon() {
  return async function (dispatch, getState) {
    const added = getState().getIn(['layoutMgt', 'gspEdt', 'coupons']).keySeq().toJS()
    const ret = await dispatch(openDialog(<SlctCponDlg added={added} />))
    if (ret) {
      dispatch(gashaponActions.addCoupon(ret.id, ret.name, ret.status))
    }
  }
}

export default {
  ...gashaponActions,
  selectCoupon,
  load,
}
