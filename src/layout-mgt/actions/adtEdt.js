import { fromTypes, caa } from 'reax'
import uuid from 'uuid'

import actions from '../../actions/ActionTypes.js'
const {
  LAYOUT_MGT_MODEL_EDITING_ADDITION_UPLOAD_IMAGE,
  LAYOUT_MGT_MODEL_EDITING_ADDITION_UPLOAD_CORNER,
} = actions

import stripKey from '../../common/stripKey.js'
import upldImg from '../../apis/upldImg.js'
import { notify } from '../../notify/actions.js'
import readImageMeta, { readImageMetaFromURL } from '../../common/readImageMeta.js'

const bscActions = fromTypes(actions, stripKey('LAYOUT_MGT_MODEL_EDITING_BSC_'))
const additionActions = fromTypes(actions, stripKey('LAYOUT_MGT_MODEL_EDITING_ADDITION_'))

function load(data, readonly=false) {
  return (dispatch) => {
    dispatch(bscActions.init({...data, readonly}))
    dispatch(additionActions.init(data))
  }
}

const _upldImg = caa(LAYOUT_MGT_MODEL_EDITING_ADDITION_UPLOAD_IMAGE)
function pickImage(file) {
  return async function (dispatch, getState) {
    // not a file
    if (file.type.indexOf('image') !== 0) {
      return dispatch(notify('请上传图片文件', 'danger'))
    } else {
      const pics = getState().getIn(['layoutMgt', 'adtEdt', 'pictures'])
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
    dispatch(_upldImg.pending(id))

    try {
      const res = await upldImg(file)
      dispatch(_upldImg.resolve(id, res.url))
    } catch (e) {
      dispatch(notify('上传失败', 'danger'))
      dispatch(_upldImg.reject(id))
    }
  }
}

const _uploadCorner = caa(LAYOUT_MGT_MODEL_EDITING_ADDITION_UPLOAD_CORNER)
function pickCorner(file) {
  return async function (dispatch) {
    // not a file
    if (file.type.indexOf('image') !== 0) {
      dispatch(notify('请上传图片文件', 'danger'))
      return
    }
    dispatch(_uploadCorner.pending())

    try {
      const res = await upldImg(file)
      dispatch(_uploadCorner.resolve(res.url))
    } catch (e) {
      dispatch(notify('上传失败', 'danger'))
      dispatch(_uploadCorner.reject())
    }
  }
}

export default {
  ...additionActions,
  load,
  pickImage,
  pickCorner,
  notify,
}
