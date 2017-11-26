import I from 'immutable'

import { ha, keyedReducer } from 'reax'
import actionTypes from '../../actions/ActionTypes'
import { formatDate } from 'tjs'

const {
  LAYOUT_MGT_DETAILS_RESET,
  LAYOUT_MGT_DETAILS_LOADED,
  LAYOUT_MGT_DETAILS_UPDATE_FILTERS,
  LAYOUT_MGT_DETAILS_CHANGE_ORDER,
  LAYOUT_MGT_DETAILS_RESET_FILTERS,
  LAYOUT_MGT_DETAILS_PAGE_TO,
  LAYOUT_MGT_DETAILS_CHANGE_PAGE_SIZE,
  LAYOUT_MGT_DETAILS_UPDATE_CANVAS_SIZE,
  LAYOUT_MGT_DETAILS_CLICK_MODEL,
  LAYOUT_MGT_DETAILS_CHANGE_SCALE,
} = actionTypes

const INIT_FILTERS = I.fromJS({
  name: '',
  keyword: '',
  display: 'table',
  type: '',
  entrance: '',
  status: 0,
  order: null
})
const INIT_CANVAS = I.fromJS({
  width: 0,
  height: 0,
  clickedModel: null,
  measureScaleIndex: 1,
  measureScales: [0.5, 1, 2],
  measureScaleBase: 50,
})
const INIT_STATE = I.fromJS({
  id: null,
  loading: true,
  entrances: null,
  models: null,
  page: 1,
  pageSize: 10,
  filters: INIT_FILTERS,
  canvas: INIT_CANVAS,
})

export default ha({
  [LAYOUT_MGT_DETAILS_RESET]: () => INIT_STATE,
  [LAYOUT_MGT_DETAILS_LOADED]: (state, action) => {
    let [entrances, id] = action.payload
    entrances = I.fromJS(entrances)
    id = id || state.get('id')
    let models = I.List()

    entrances.forEach(etr => {
      models = models.concat(
        etr.get('models').map(model => model.merge({
          entranceId: etr.get('id'),
          entranceName: etr.get('name'),
          createTimeString: formatDate(new Date(model.get('createTime') * 1000), 'yyyy-MM-dd HH:mm:ss'),
          updateTimeString: formatDate(new Date(model.get('updateTime') * 1000), 'yyyy-MM-dd HH:mm:ss')
        }))
      )
    })
    models = models
      .sortBy(m => m.get('name'))
      .sortBy(m => m.get('sort'))
      .sortBy(m => m.get('status'))

    return state.withMutations(ms => {
      ms.set('id', id)
      ms.set('entrances', entrances)
      ms.set('models', models)
      ms.set('loading', false)
    })
  },
  [LAYOUT_MGT_DETAILS_UPDATE_FILTERS]: keyedReducer((state, action) => ['filters'].concat([action.payload[0]]), x => x[1]),
  [LAYOUT_MGT_DETAILS_RESET_FILTERS]: (state) => state.set('filters', INIT_FILTERS),
  [LAYOUT_MGT_DETAILS_CHANGE_ORDER]: (state, action) => state.updateIn(['filters', 'order'], order => {
    let key = action.payload[0]
    if (order === null) {
      return I.Map({
        k: key,
        v: 'desc'
      })
    } else if (order.get('k') === key) {
      return order.get('v') === 'asc' ? null : order.set('v', 'asc')
    } else {
      return order.set('k', key).set('v', 'desc')
    }
  }),
  [LAYOUT_MGT_DETAILS_PAGE_TO]: keyedReducer('page'),
  [LAYOUT_MGT_DETAILS_CHANGE_PAGE_SIZE]: keyedReducer('pageSize'),
  [LAYOUT_MGT_DETAILS_UPDATE_CANVAS_SIZE]: keyedReducer((state, action) => ['canvas'].concat([action.payload[0]]), x => x[1]),
  [LAYOUT_MGT_DETAILS_CLICK_MODEL]: keyedReducer(['canvas', 'clickedModel']),
  [LAYOUT_MGT_DETAILS_CHANGE_SCALE]: keyedReducer(['canvas', 'measureScaleIndex']),
}, INIT_STATE)
