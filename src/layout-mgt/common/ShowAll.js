import I from 'immutable'

const _ShowAll = I.Record({
  loading: true,
  plans: I.OrderedMap(),
})

export default _ShowAll
