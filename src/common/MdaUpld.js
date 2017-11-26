import I from 'immutable'

const _MdaUpld = I.Record({
  id: undefined,
  url: undefined,
  loading: false,
})

export default class MdaUpld extends _MdaUpld {
  dump() {
    return this.get('url')
  }
}
