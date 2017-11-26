import I from 'immutable'

const SelectedCoupon = I.Record({
  id: '',
  name: '',
  ratio: 0,
  status: undefined,
})

export default SelectedCoupon
