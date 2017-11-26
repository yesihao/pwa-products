import I from 'immutable'

const _Coupon = I.Record({
  id: undefined,
  name: '',
  value: undefined,
  minConsume: undefined,
  startTime: undefined,
  endTime: undefined,
  logo: '',
  status: ''
})

export default class Coupon extends _Coupon {
  dump() {
    return {
      id: this.id,
      name: this.name,
      status: this.status,
    }
  }
}
