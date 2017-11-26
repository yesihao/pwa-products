import { patch } from '../../apis'

export default (id, status) => {
  return patch(`/wc/pay/v1/coupons/${id}`, { status })
}
