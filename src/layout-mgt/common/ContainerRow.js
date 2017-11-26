import I from 'immutable'

import ContainerRowItem from './ContainerRowItem.js'

const _ContainerRow = I.Record({
  items: I.List(I.Repeat(new ContainerRowItem, 3))
})

export default class ContainerRow extends _ContainerRow {
  constructor(obj={}) {
    if (obj.items) {
      obj.items = I.List(obj.items.map(x => new ContainerRowItem(x)))
    }
    super(obj)
  }

  dump() {
    return {
      items: this.items.map(x => x.dump()).toArray()
    }
  }

  validate() {
    return this.items.every(x => x.validate())
  }
}
