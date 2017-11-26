import I from 'immutable'

import ContainerRow from './ContainerRow.js'

const _Container = I.Record({
  category: '',
  rows: I.List(),
})

export default class Container extends _Container {
  constructor(obj={}) {
    if (obj.rows) {
      obj.rows = I.List(obj.rows.map(x => new ContainerRow(x)))
    }
    super(obj)
  }

  dump() {
    return {
      category: this.category,
      rows: this.rows.map(x => x.dump()).toArray()
    }
  }

  validate() {
    return this.category.length > 0
    && this.rows.size > 0 && this.rows.every(x => x.validate())
  }
}
