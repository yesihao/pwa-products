import { get } from '../../apis'

export default () => {
  return get('/wc/pay/v1/coupons')
}
