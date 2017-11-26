import I from 'immutable'
import { ha, keyedReducer } from 'reax'
import uuid from 'uuid'

import LndScrEdt from '../common/LndScrEdt.js'
import actions from '../../actions/ActionTypes.js'
const {
  LAYOUT_MGT_MODEL_EDITING_LND_SCR_INIT,
  LAYOUT_MGT_MODEL_EDITING_LND_SCR_CHANGE_STYLE,
  LAYOUT_MGT_MODEL_EDITING_LND_SCR_CHANGE_VIDEO,
  LAYOUT_MGT_MODEL_EDITING_LND_SCR_ADD_IMAGES,
  LAYOUT_MGT_MODEL_EDITING_LND_SCR_CHANGE_IMAGE,
  LAYOUT_MGT_MODEL_EDITING_LND_SCR_DEL_IMAGE,
} = actions
import VdoUpld from '../../common/VdoUpld.js'

export default ha({
  [LAYOUT_MGT_MODEL_EDITING_LND_SCR_INIT]: (_, action) => new LndScrEdt(action.payload),
  [LAYOUT_MGT_MODEL_EDITING_LND_SCR_CHANGE_STYLE]: keyedReducer('style'),
  [LAYOUT_MGT_MODEL_EDITING_LND_SCR_CHANGE_VIDEO]: keyedReducer('video', x => new VdoUpld(x)),
  [LAYOUT_MGT_MODEL_EDITING_LND_SCR_ADD_IMAGES]: (state, action) => {
    const files = action.payload

    return state.withMutations(x => {
      files.forEach(file => {
        const id = uuid()
        x.setIn(['pictures', id], I.Map({ id, file }))
      })
    })
  },
  [LAYOUT_MGT_MODEL_EDITING_LND_SCR_CHANGE_IMAGE]: (state, action) => {
    const [id, url] = action.payload

    return state.setIn(['pictures', id, 'url'], url)
  },
  [LAYOUT_MGT_MODEL_EDITING_LND_SCR_DEL_IMAGE]: (state, action) => {
    const id = action.payload

    return state.deleteIn(['pictures', id])
  },
}, new LndScrEdt())
