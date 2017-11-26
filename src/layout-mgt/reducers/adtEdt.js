import { ha, keyedReducer } from 'reax'

import actions from '../../actions/ActionTypes.js'
const {
  LAYOUT_MGT_MODEL_EDITING_ADDITION_INIT,
  LAYOUT_MGT_MODEL_EDITING_ADDITION_CHANGE_STYLE,
  LAYOUT_MGT_MODEL_EDITING_ADDITION_CHANGE_TITLE,
  LAYOUT_MGT_MODEL_EDITING_ADDITION_CHANGE_DESCRIPTION,
  LAYOUT_MGT_MODEL_EDITING_ADDITION_CHANGE_TEXT,
  LAYOUT_MGT_MODEL_EDITING_ADDITION_UPLOAD_IMAGE,
  LAYOUT_MGT_MODEL_EDITING_ADDITION_DELETE_IMAGE,
  LAYOUT_MGT_MODEL_EDITING_ADDITION_UPLOAD_CORNER,
  LAYOUT_MGT_MODEL_EDITING_ADDITION_DELETE_CORNER,
  LAYOUT_MGT_MODEL_EDITING_ADDITION_CHG_VDO,
} = actions
import Addition from '../common/Addition.js'
import ImgUpld from '../../common/ImgUpld.js'
import VdoUpld from '../../common/VdoUpld.js'

function delImg(state, action) {
  const id = action.payload
  return state.deleteIn(['pictures', id])
}

function delCorner(state) {
  return state.delete('corner')
}

export default ha({
  [LAYOUT_MGT_MODEL_EDITING_ADDITION_INIT]: (_, action) => new Addition(action.payload),
  [LAYOUT_MGT_MODEL_EDITING_ADDITION_CHANGE_STYLE]: (state, action) => {
    const style = action.payload
    if (style === state.get('style')) {
      return state
    }
    return state.withMutations(x => {
      x.set('style', style)
      if (style === 'descPictures') {
        x.delete('title')
        x.delete('description')
        x.delete('pictures')
      } else if (style === 'cornerText') {
        x.delete('text')
        x.delete('corner')
      } else if (style === 'video') {
        x.delete('video')
      }
    })
  },
  [LAYOUT_MGT_MODEL_EDITING_ADDITION_CHANGE_TITLE]: keyedReducer('title'),
  [LAYOUT_MGT_MODEL_EDITING_ADDITION_CHANGE_DESCRIPTION]: keyedReducer('description'),
  [LAYOUT_MGT_MODEL_EDITING_ADDITION_CHANGE_TEXT]: keyedReducer('text'),
  [LAYOUT_MGT_MODEL_EDITING_ADDITION_UPLOAD_IMAGE]: {
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
    reject: delImg
  },
  [LAYOUT_MGT_MODEL_EDITING_ADDITION_DELETE_IMAGE]: delImg,
  [LAYOUT_MGT_MODEL_EDITING_ADDITION_UPLOAD_CORNER]: {
    pending: keyedReducer('corner', () => new ImgUpld({ loading: true })),
    resolve: (state, action) => {
      const url = action.payload
      return state.mergeIn(['corner'], {
        loading: false,
        url
      })
    },
    reject: delCorner,
  },
  [LAYOUT_MGT_MODEL_EDITING_ADDITION_DELETE_CORNER]: delCorner,
  [LAYOUT_MGT_MODEL_EDITING_ADDITION_CHG_VDO]: keyedReducer('video', x => new VdoUpld(x))
}, new Addition())
