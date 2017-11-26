import I from 'immutable'
import { ha } from 'reax'

import actions from '../../actions/ActionTypes.js'
import ShowAll from '../common/ShowAll.js'
import Plan from '../common/Plan.js'
const {
  LAYOUT_MGT_SHOW_ALL_INIT,
  LAYOUT_MGT_SHOW_ALL_UNLOAD,
  LAYOUT_MGT_SHOW_ALL_RELOAD_PLAN,
} = actions

export default ha({
  [LAYOUT_MGT_SHOW_ALL_INIT]: (state, action) => {
    const plans = action.payload
    return state.withMutations(x => {
      x.set('loading', false)
      x.set('plans', I.OrderedMap(plans.map(y => [y.id, new Plan(y)])))
    })
  },
  [LAYOUT_MGT_SHOW_ALL_UNLOAD]: (state) => {
    return state.clear()
  },
  [LAYOUT_MGT_SHOW_ALL_RELOAD_PLAN]: (state, action) => {
    const [ id, plan ] = action.payload
    return state.setIn(['plans', id], new Plan(plan))
  },
}, new ShowAll())
