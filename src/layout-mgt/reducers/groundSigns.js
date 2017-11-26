import { ha } from 'reax'

import actions from '../../actions/ActionTypes.js'
const {
  LAYOUT_MGT_GROUND_SIGNS_INIT,
  LAYOUT_MGT_GROUND_SIGNS_UPLD_IMG,
} = actions
import GroundSigns from '../common/GroundSigns.js'

function delImg(state, action) {
  const id = action.payload
  return state.setIn(['pictures', id], state.getIn(['initPictures', id]))
}

export default ha({
  [LAYOUT_MGT_GROUND_SIGNS_INIT]: (_, action) => new GroundSigns({
    ...action.payload,
    loading: false
  }),
  [LAYOUT_MGT_GROUND_SIGNS_UPLD_IMG]: {
    pending: (state, action) => {
      const id = action.payload
      return state.setIn(['pictures', id, 'loading'], true)
    },
    resolve: (state, action) => {
      const [id, url] = action.payload
      return state.mergeIn(['pictures', id], {
        loading: false,
        url
      })
    },
    reject: delImg
  },
}, new GroundSigns())
