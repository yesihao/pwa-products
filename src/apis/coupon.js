import { get } from './index.js'

export function myCouponsForMarketing() {
  return get('/wc/pay/v1/coupons?expire=false&status=1')
}
