import { fromTypes, caa } from 'reax'

import actionTypes from '../../actions/ActionTypes'
import { notify } from '../../notify/actions'

import stripKey from '../../common/stripKey'
import couponEdtErrHandler from '../common/couponEdtErrHandler'
import { readFileAsBase64 } from '../../common/file'
import getCoupon from '../apis/getCoupon'
import updateCouponApi from '../apis/updateCoupon'

const {
  reset,
  updateFields,
  loaded,
  convertFile,
  setFileErrorUrl,
  clearFile,
} = fromTypes(actionTypes, stripKey('LAYOUT_MGT_COUPON_EDT_'))

function load(_, props) {
  return async (dispatch, getState) => {
    let id
    if (props) {
      id = props.match.params.id
    } else {
      id = getState().getIn(['layoutMgt', 'couponEdt', 'id'])
    }

    try {
      let resp = await getCoupon(id)
      const coupon = resp.result

      dispatch(loaded(coupon))
    } catch (e) {
      dispatch(notify('载入优惠券数据失败', 'danger'))
    }
  }
}

const _convertFile = caa(convertFile().type)
function pickFile(file) {
  return async function (dispatch) {

    if (file.name.substr(file.name.indexOf('xlsx')) !== 'xlsx') {
      dispatch(notify('请上传Excel文件', 'danger'))
      return
    }
    dispatch(_convertFile.pending(file.name))

    try {
      const res = await readFileAsBase64(file)
      dispatch(_convertFile.resolve(res))
    } catch (e) {
      dispatch(notify('文件转化失败', 'danger'))
    }
  }
}

function updateCoupon() {
  return async (dispatch, getState) => {
    let coupon = getState().getIn(['layoutMgt', 'couponEdt'])

    if (!coupon.validateDate()) {
      dispatch(notify('优惠券可用起始时间必须早于结束时间',  'danger'))
      return
    }

    let toAdd = confirm('是否更新的优惠券')
    if (toAdd) {
      try {
        await updateCouponApi(coupon.get('id'), coupon.dump())
        dispatch(notify('更新优惠券成功', 'info'))
        dispatch(load())
      } catch (e) {
        let ret
        if (e.result) {
          dispatch(setFileErrorUrl(e.result.url))
          ret = e.ret
        } else {
          ret = e
        }
        dispatch(notify(couponEdtErrHandler(ret, '更新'), 'danger'))
      }
    }
  }
}

export {
  reset,
  updateFields,
  load,
  pickFile,
  clearFile,
  setFileErrorUrl,
  updateCoupon as submit,
}
