import React from 'react'
import { fromTypes } from 'reax'

import actionTypes from '../../actions/ActionTypes'
import { openDrawer } from '../../drawer/actions'
import { notify } from '../../notify/actions'

import stripKey from '../../common/stripKey'
import { EDIT_CLASS_MAP } from '../common/maps'
import { getSearchStringParams } from '../../common/url'
import getLayoutDetails from '../apis/getLayoutDetails'
import deleteModelApi from '../apis/deleteModel'

const {
  loaded,
  updateFilters,
  ...rest
} = fromTypes(actionTypes, stripKey('LAYOUT_MGT_DETAILS_'))

function load(_, props) {
  return async (dispatch, getState) => {
    let id = getState().getIn(['layoutMgt', 'layout', 'id'])
    if (props) {
      id = props.match.params.id
      let status = parseInt(getSearchStringParams(props.location.search).status)
      status && dispatch(updateFilters('status', status))
    }

    try {
      const resp = await getLayoutDetails(id)
      const entrances = resp.result.entrances

      dispatch(loaded(entrances, id))
    } catch (e) {
      dispatch(notify('载入方案详情失败', 'danger'))
    }
  }
}

function editModel(modelId, readonly) {
  return async (dispatch, getState) => {
    let model = getState().getIn(['layoutMgt', 'layout', 'models']).find(m => m.get('id') === modelId)
    let Edt = EDIT_CLASS_MAP[model.get('classification')][0]
    let update = EDIT_CLASS_MAP[model.get('classification')][1]

    try {
      let ret = await dispatch(openDrawer(<Edt data={model.toJS()} readonly={readonly} />))
      if (ret) {
        await update(modelId, model.get('entranceId'), ret)
        dispatch(notify('更新模型成功', 'info'))
        dispatch(load())
      }
    } catch (e) {
      dispatch(notify('更新模型失败', 'danger'))
    }
  }
}

function deleteModel(modelId, entranceId) {
  return async (dispatch, getState) => {
    const planId = getState().getIn(['layoutMgt', 'layout', 'id'])
    const toDel = confirm('是否要删除该模型？\n注意：该操作不可恢复')
    if (toDel) {
      try {
        await deleteModelApi(modelId, planId, entranceId)
        dispatch(notify('删除模型成功', 'info'))
        dispatch(load())
      } catch (e) {
        dispatch(notify('删除模型失败', 'danger'))
      }
    }
  }
}

export default {
  ...rest,
  updateFilters,
  load,
  editModel,
  deleteModel,
}
