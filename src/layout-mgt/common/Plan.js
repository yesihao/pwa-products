import I from 'immutable'

const _Plan = I.Record({
  id: '',
  name: '',
  status: undefined,
  entranceNum: undefined,
  modelNum: undefined,
  toEditModelNum: undefined,
  theme: '',
  thumbUrl: '',
  updateTime: undefined,
})

export default _Plan
