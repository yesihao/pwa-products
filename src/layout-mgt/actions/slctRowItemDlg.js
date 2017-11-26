import { caa, fromTypes } from 'reax'
import uuid from 'uuid'

import actions from '../../actions/ActionTypes.js'
import stripKey from '../../common/stripKey.js'
import upldImg from '../../apis/upldImg.js'
import { notify } from '../../notify/actions.js'
import { closeDialog } from '../../dialog/actions.js'
import readImageMeta, { readImageMetaFromURL } from '../../common/readImageMeta.js'

const {
  LAYOUT_MGT_SLCT_ROW_ITEM_DLG_UPLD_PIC,
  LAYOUT_MGT_SLCT_ROW_ITEM_DLG_UPLD_THM,
} = actions

const dlgActions = fromTypes(actions, stripKey('LAYOUT_MGT_SLCT_ROW_ITEM_DLG_'))

function load() {
  return function (dispatch) {
    dispatch(dlgActions.init())
  }
}

const _uplgThm = caa(LAYOUT_MGT_SLCT_ROW_ITEM_DLG_UPLD_THM)
function pickThm(file) {
  return async function (dispatch) {
    // not a file
    if (file.type.indexOf('image') !== 0) {
      return dispatch(notify('请上传图片文件', 'danger'))
    } else {
      try {
        const meta = await readImageMeta(file)
        if (meta.width !== meta.height) {
          return dispatch(notify('商品陈列图宽高比须为1:1', 'danger'))
        }
      } catch (e) {
        return dispatch(notify('请上传图片文件', 'danger'))
        /* handle error */
      }
    }
    dispatch(_uplgThm.pending())

    try {
      const res = await upldImg(file)
      dispatch(_uplgThm.resolve(res.url))
    } catch (e) {
      dispatch(notify('上传失败', 'danger'))
      dispatch(_uplgThm.reject())
    }
  }
}

const _uplgPic = caa(LAYOUT_MGT_SLCT_ROW_ITEM_DLG_UPLD_PIC)
function pickPic(file) {
  return async function (dispatch, getState) {
    // not a file
    if (file.type.indexOf('image') !== 0) {
      return dispatch(notify('请上传图片文件', 'danger'))
    } else {
      const pics = getState().getIn(['layoutMgt', 'slctRowItemDlg', 'pictures'])
      if (pics.size > 0) {
        const firstImg = pics.valueSeq().getIn([0, 'url'])
        const r0 = readImageMeta(file)
        const r1 = readImageMetaFromURL(firstImg)

        try {
          const [m0, m1] = await Promise.all([r0, r1])

          // not the same ratio
          if (Math.abs(m0.width/m0.height - m1.width/m1.height) > 0.1) {
            return dispatch(notify('请确保所有图片宽高比一致', 'danger'))
          }
        } catch (e) {
          return dispatch(notify('请上传图片文件', 'danger'))
          /* handle error */
        }
      }
    }
    const id = uuid()
    dispatch(_uplgPic.pending(id))

    try {
      const res = await upldImg(file)
      dispatch(_uplgPic.resolve(id, res.url))
    } catch (e) {
      dispatch(notify('上传失败', 'danger'))
      dispatch(_uplgPic.reject(id))
    }
  }
}

function confirm() {
  return function (dispatch, getState) {
    dispatch(closeDialog(getState().getIn(['layoutMgt', 'slctRowItemDlg']).dump()))
  }
}

function cancel() {
  return function (dispatch) {
    dispatch(closeDialog())
  }
}

function videoError(msg) {
  return dispatch => {
    dispatch(notify(msg, 'danger'))
  }
}

export default {
  ...dlgActions,
  pickThm,
  pickPic,
  confirm,
  cancel,
  load,
  videoError,
}
