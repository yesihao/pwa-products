import { ha, keyedReducer } from 'reax'

import actions from '../../actions/ActionTypes.js'
const {
  LAYOUT_MGT_MODEL_EDITING_BSC_INIT,
  LAYOUT_MGT_MODEL_EDITING_COMMON_CHANGE_NAME,
} = actions
import BscEdt from '../common/BscEdt.js'

export default ha({
  [LAYOUT_MGT_MODEL_EDITING_BSC_INIT]: (_, action) => new BscEdt(action.payload),
  [LAYOUT_MGT_MODEL_EDITING_COMMON_CHANGE_NAME]: keyedReducer('name'),
}, new BscEdt())
