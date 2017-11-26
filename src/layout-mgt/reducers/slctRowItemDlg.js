import { ha, keyedReducer } from 'reax'

import ContainerRowItem from '../common/ContainerRowItem.js'
import actions from '../../actions/ActionTypes.js'
const {
  LAYOUT_MGT_SLCT_ROW_ITEM_DLG_INIT,
  LAYOUT_MGT_SLCT_ROW_ITEM_DLG_CHG_TITLE,
  LAYOUT_MGT_SLCT_ROW_ITEM_DLG_CHG_DESC,
  LAYOUT_MGT_SLCT_ROW_ITEM_DLG_UPLD_THM,
  LAYOUT_MGT_SLCT_ROW_ITEM_DLG_DEL_THM,
  LAYOUT_MGT_SLCT_ROW_ITEM_DLG_UPLD_PIC,
  LAYOUT_MGT_SLCT_ROW_ITEM_DLG_DEL_PIC,
  LAYOUT_MGT_SLCT_ROW_ITEM_DLG_CHG_STYLE,
  LAYOUT_MGT_SLCT_ROW_ITEM_DLG_CHG_VDO,
} = actions
import ImgUpld from '../../common/ImgUpld.js'
import VdoUpld from '../../common/VdoUpld.js'

function delThm(state) {
  return state.delete('thumb')
}

function delPic(state, action) {
  const id = action.payload
  return state.deleteIn(['pictures', id])
}

export default ha({
  [LAYOUT_MGT_SLCT_ROW_ITEM_DLG_INIT]: (_, action) => new ContainerRowItem(action.payload),
  [LAYOUT_MGT_SLCT_ROW_ITEM_DLG_CHG_TITLE]: keyedReducer('title'),
  [LAYOUT_MGT_SLCT_ROW_ITEM_DLG_CHG_DESC]: keyedReducer('description'),
  [LAYOUT_MGT_SLCT_ROW_ITEM_DLG_UPLD_THM]: {
    pending: keyedReducer('thumb', () => new ImgUpld({ loading: true })),
    resolve: (state, action) => {
      const url = action.payload
      return state.mergeIn(['thumb'], {
        loading: false,
        url
      })
    },
    reject: delThm,
  },
  [LAYOUT_MGT_SLCT_ROW_ITEM_DLG_DEL_THM]: delThm,
  [LAYOUT_MGT_SLCT_ROW_ITEM_DLG_UPLD_PIC]: {
    pending: (state, action) => {
      const id = action.payload
      return state.setIn(['pictures', id], new ImgUpld({ id, loading: true }))
    },
    resolve: (state, action) => {
      const [id, url] = action.payload
      return state.mergeIn(['pictures', id], {
        loading: false,
        url
      })
    },
    reject: delPic
  },
  [LAYOUT_MGT_SLCT_ROW_ITEM_DLG_DEL_PIC]: delPic,
  [LAYOUT_MGT_SLCT_ROW_ITEM_DLG_CHG_STYLE]: keyedReducer('style'),
  [LAYOUT_MGT_SLCT_ROW_ITEM_DLG_CHG_VDO]: keyedReducer('video', x => new VdoUpld(x))
}, new ContainerRowItem())
