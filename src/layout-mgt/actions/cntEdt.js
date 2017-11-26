import React from 'react'
import { fromTypes } from 'reax'

import actions from '../../actions/ActionTypes.js'
import stripKey from '../../common/stripKey.js'
import ContainerRowItem from '../common/ContainerRowItem.js'
import SlctRowItemDlg from '../containers/SlctRowItemDlg.js'

import { openDialog } from '../../dialog/actions.js'

const bscActions = fromTypes(actions, stripKey('LAYOUT_MGT_MODEL_EDITING_BSC_'))
const cntActions = fromTypes(actions, stripKey('LAYOUT_MGT_MODEL_EDITING_CNT_'))

function load(data, readonly=false) {
  return (dispatch) => {
    dispatch(bscActions.init({...data, readonly}))
    dispatch(cntActions.init(data))
  }
}

function slctRowItem(rowIdx, itemIdx) {
  return async function (dispatch) {
    const ret = await dispatch(openDialog(<SlctRowItemDlg />))
    if (ret) {
      dispatch(cntActions.chgRowItem(rowIdx, itemIdx, new ContainerRowItem(ret)))
    }
  }
}

export default {
  ...cntActions,
  slctRowItem,
  load,
}
