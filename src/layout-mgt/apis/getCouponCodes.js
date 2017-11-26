import { get } from '../../apis'

export default (id, page, per_page, status_list) => {
  let params = { page, per_page, status_list }
  let search = []
  Object.keys(params).map(k => {
    if (params[k]) {
      search.push(`${k}=${encodeURIComponent(params[k])}`)
    }
  })

  return get(`/wc/pay/v1/coupons/${id}/codes?${search.join('&')}`)
}
