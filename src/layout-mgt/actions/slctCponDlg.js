import { fromTypes } from 'reax'

import actions from '../../actions/ActionTypes.js'
import stripKey from '../../common/stripKey.js'
import { closeDialog } from '../../dialog/actions.js'
import { myCouponsForMarketing } from '../../apis/coupon.js'
import { notify } from '../../notify/actions.js'

const acs = fromTypes(actions, stripKey('LAYOUT_MGT_SLCT_CPON_DLG_'))

function load(added=[]) {
  return async dispatch => {
    try {
      const ret = await myCouponsForMarketing()
      dispatch(acs.init(ret.result.coupons, added))
    } catch (e) {
      dispatch(notify('载入优惠券失败', 'danger'))
    }
  }
}

function confirm() {
  return (dispatch, getState) => {
    const state = getState().getIn(['layoutMgt', 'slctCponDlg'])
    const slcted = state.get('slcted')
    const cpon = state.getIn(['cpons', slcted])
    dispatch(closeDialog(cpon.dump()))
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
