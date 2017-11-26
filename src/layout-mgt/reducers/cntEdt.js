import I from 'immutable'
import { ha, keyedReducer } from 'reax'

import actions from '../../actions/ActionTypes.js'
const {
  LAYOUT_MGT_MODEL_EDITING_CNT_INIT,
  LAYOUT_MGT_MODEL_EDITING_CNT_SWCH_ROWS,
  LAYOUT_MGT_MODEL_EDITING_CNT_CHG_CTG,
  LAYOUT_MGT_MODEL_EDITING_CNT_CHG_ROW_ITEM,
  LAYOUT_MGT_MODEL_EDITING_CNT_DEL_ROW_ITEM,
} = actions
import Container from '../common/Container.js'
import ContainerRow from '../common/ContainerRow.js'
import ContainerRowItem from '../common/ContainerRowItem.js'

export default ha({
  [LAYOUT_MGT_MODEL_EDITING_CNT_INIT]: (_, action) => new Container(action.payload),
  [LAYOUT_MGT_MODEL_EDITING_CNT_SWCH_ROWS]: (state, action) => {
    const n = action.payload
    return state.withMutations(x => {
      const curSize = x.get('rows').size
      if (curSize > n) {
        x.update('rows', rows => rows.take(n))
      } else {
        x.update('rows', rows => rows.concat(I.List(I.Repeat(new ContainerRow(), n - curSize))))
      }
    })
  },
  [LAYOUT_MGT_MODEL_EDITING_CNT_CHG_CTG]: keyedReducer('category'),
  [LAYOUT_MGT_MODEL_EDITING_CNT_CHG_ROW_ITEM]: keyedReducer(
    (_, action) => ['rows', action.payload[0], 'items', action.payload[1]],
    x => x[2]
  ),
  [LAYOUT_MGT_MODEL_EDITING_CNT_DEL_ROW_ITEM]: keyedReducer(
    (_, action) => ['rows', action.payload[0], 'items', action.payload[1]],
    () => new ContainerRowItem()
  )
}, new Container())
