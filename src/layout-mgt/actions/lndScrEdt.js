import { fromTypes } from 'reax'

import actions from '../../actions/ActionTypes.js'
import stripKey from '../../common/stripKey.js'
import { notify } from '../../notify/actions.js'

const bscActions = fromTypes(actions, stripKey('LAYOUT_MGT_MODEL_EDITING_BSC_'))
const acs = fromTypes(actions, stripKey('LAYOUT_MGT_MODEL_EDITING_LND_SCR_'))

function load(data, readonly=false) {
  return (dispatch) => {
    dispatch(bscActions.init({...data, readonly}))
    dispatch(acs.init(data))
  }
}

function uploadFiles(files) {
  return (dispatch, getState) => {
    const pics = getState().getIn(['layoutMgt', 'lndScrEdt', 'pictures'])

    if (files.length + pics.size > 50) {
      dispatch(notify('所选图片数量超过了限制，超出部分将被忽略', 'warning'))
    }
    files = [].slice.call(files, 0, 50 - pics.size)
    dispatch(acs.addImages(files))
  }
}

export default {
  ...acs,
  load,
  notify,
  uploadFiles,
}
