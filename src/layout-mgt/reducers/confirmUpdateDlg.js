import { ha } from 'reax'

import ConfirmUpdateDlg from '../common/ConfirmUpdateDlg.js'
import actions from '../../actions/ActionTypes.js'
const {
  LAYOUT_MGT_CONFIRM_UPDATE_DLG_INIT,
  LAYOUT_MGT_CONFIRM_UPDATE_DLG_UNLOAD,
} = actions

export default ha({
  [LAYOUT_MGT_CONFIRM_UPDATE_DLG_INIT]: (_, action) => new ConfirmUpdateDlg({ ...action.payload, loading: false }),
  [LAYOUT_MGT_CONFIRM_UPDATE_DLG_UNLOAD]: state => state.clear(),
}, new ConfirmUpdateDlg())
