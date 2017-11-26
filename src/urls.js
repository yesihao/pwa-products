function login() {
  return '/login'
}
function layoutmgt() {
  return '/m/layoutmgt'
}
function layoutmgtShowall() {
  return '/m/layoutmgt/showall'
}
function layoutmgtDetails(id, status) {
  return `/m/layoutmgt/details/${id}${status ? `?status=${status}` : ''}`
}
function layoutmgtCoupons() {
  return '/m/layoutmgt/coupons'
}
function layoutmgtCouponAdd() {
  return '/m/layoutmgt/coupon/add'
}
function layoutmgtCouponDetails(id) {
  return `/m/layoutmgt/coupon/${id}`
}
function layoutmgtCouponEdt(id) {
  return `/m/layoutmgt/coupon/${id}/edt`
}
function layoutmgtGroundSigns(id) {
  return `/m/layoutmgt/gndsgns/${id}`
}
function userSettings() {
  return '/m/user/settings'
}
function userSettingsPwd() {
  return '/m/user/settings/pwd'
}

export default {
  login,
  layoutmgt,
  layoutmgtShowall,
  layoutmgtDetails,
  layoutmgtCoupons,
  layoutmgtCouponAdd,
  layoutmgtCouponDetails,
  layoutmgtCouponEdt,
  layoutmgtGroundSigns,
  userSettings,
  userSettingsPwd,
}
