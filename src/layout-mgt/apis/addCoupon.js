import { post } from '../../apis'

export default (body) => {
  return post('/wc/pay/v1/coupons', body)
}
