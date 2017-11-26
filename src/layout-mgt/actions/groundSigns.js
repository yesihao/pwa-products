import { fromTypes, caa } from 'reax'

import actionTypes from '../../actions/ActionTypes'
import { notify } from '../../notify/actions'

import stripKey from '../../common/stripKey'
import upldImgApi from '../../apis/upldImg.js'
import updateGroundSignApi from '../apis/updateGroundSign'
import getLayoutDetails from '../apis/getLayoutDetails'

const {
  init,
  upldImg,
} = fromTypes(actionTypes, stripKey('LAYOUT_MGT_GROUND_SIGNS_'))

function load(_, props) {
  return async (dispatch) => {
    const planId = props.match.params.id

    try {
      const resp = await getLayoutDetails(planId)
      const pictures = resp.result.entrances[0].pictures
      const entranceIds = resp.result.entrances.map(e => e.id)

      dispatch(init({ pictures, entranceIds }))
    } catch (e) {
      dispatch(notify('载入地贴数据失败', 'danger'))
    }
  }
}

const _upldImg = caa(upldImg().type)
function pickImg(id, file) {
  return async function (dispatch) {

    if (file.type.indexOf('image') !== 0) {
      dispatch(notify('请上传图片文件', 'danger'))
      return
    }
    dispatch(_upldImg.pending(id))

    try {
      const res = await upldImgApi(file)
      let updated = await dispatch(updateGroundSign(id, res.url))
      if (updated) {
        dispatch(_upldImg.resolve(id, res.url))
      }
    } catch (e) {
      dispatch(notify('上传失败', 'danger'))
      dispatch(_upldImg.reject(id))
    }
  }
}

function updateGroundSign(id, url) {
  return async (dispatch, getState) => {
    let groundSigns = getState().getIn(['layoutMgt', 'groundSigns'])
    let toUpdate = confirm('请确认您线下店铺内的地贴已经更换？\n（原地贴将不能再被使用！）\n若已更换请点“继续”')
    if (toUpdate) {
      try {
        let { entranceIds, pictures } = groundSigns.dump(id, url)
        let ps = entranceIds.map(id => updateGroundSignApi(id, { pictures }))
        await Promise.all(ps)
        dispatch(notify('更新地贴成功', 'info'))
        return true
      } catch (e) {
        dispatch(notify('更新地贴失败', 'danger'))
        return false
      }
    }
  }
}

export {
  load,
  pickImg,
}
