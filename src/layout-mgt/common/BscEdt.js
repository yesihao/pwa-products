import I from 'immutable'

const _BscEdt = I.Record({
  id: undefined,
  name: '',
  function: '',
  classification: '',
  screenshot: '',
  readonly: false,
})

export default class BscEdt extends _BscEdt {
  dump() {
    return {
      id: this.get('id'),
      name: this.get('name'),
    }
  }

  validate() {
    return this.get('name').trim().length !== 0
  }
}
