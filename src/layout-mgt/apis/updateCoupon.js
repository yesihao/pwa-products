import { put } from '../../apis'

export default (id, body) => {
  return put(`/wc/pay/v1/coupons/${id}`, body)
}
