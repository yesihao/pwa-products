import { get } from '../../apis'

export default (id) => {
  return get(`/wc/pay/v1/coupons/${id}`)
}
