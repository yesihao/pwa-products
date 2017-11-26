import I from 'immutable'

import SelectedCoupon from './SelectedCoupon.js'

const _Gashapon = I.Record({
  coupons: I.OrderedMap(),
  total: 100,
})

export default class Gashapon extends _Gashapon {
  constructor(obj={}) {
    if (obj.coupons) {
      obj.coupons = I.OrderedMap(obj.coupons.map(x => [x.id, new SelectedCoupon(x)]))
    }
    super(obj)
  }

  dump() {
    return {
      coupons: this.get('coupons').valueSeq().toJS(),
    }
  }

  validate() {
    return this.coupons.size > 0 &&
      this.coupons.every(coupon => coupon.get('ratio') > 0)
  }
}
