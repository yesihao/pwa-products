import I from 'immutable'
import { ha, keyedReducer } from 'reax'

import Coupon from '../common/Coupon.js'
import actions from '../../actions/ActionTypes.js'
const {
  LAYOUT_MGT_SLCT_CPON_DLG_INIT,
  LAYOUT_MGT_SLCT_CPON_DLG_UNLOAD,
  LAYOUT_MGT_SLCT_CPON_DLG_CHG_CPON,
} = actions
const DEFAULT = I.fromJS({
  cpons: I.OrderedMap(),
  added: I.Set(),
  slcted: undefined,
  loading: true,
})

export default ha({
  [LAYOUT_MGT_SLCT_CPON_DLG_INIT]: (_, action) => {
    const [cpons, added] = action.payload
    return DEFAULT.merge({
      cpons: I.OrderedMap(cpons.map(x => [x.id, new Coupon(x)])),
      added: I.Set(added),
      loading: false,
    })
  },
  [LAYOUT_MGT_SLCT_CPON_DLG_UNLOAD]: () => DEFAULT,
  [LAYOUT_MGT_SLCT_CPON_DLG_CHG_CPON]: keyedReducer('slcted')
}, DEFAULT)
