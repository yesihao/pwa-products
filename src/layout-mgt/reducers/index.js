import { combineReducers } from 'redux-immutablejs'

import layout from './layout'
import showall from './showall.js'
import bscEdt from './bscEdt.js'
import gspEdt from './gspEdt.js'
import shwScrEdt from './shwScrEdt.js'
import adtEdt from './adtEdt.js'
import cntEdt from './cntEdt.js'
import slctCponDlg from './slctCponDlg.js'
import slctRowItemDlg from './slctRowItemDlg.js'
import coupons from './coupons.js'
import couponEdt from './couponEdt.js'
import coupon from './coupon.js'
import groundSigns from './groundSigns.js'
import lndScrEdt from './lndScrEdt.js'
import confirmUpdateDlg from './confirmUpdateDlg.js'

export default combineReducers({
  layout,
  showall,
  bscEdt,
  gspEdt,
  shwScrEdt,
  adtEdt,
  cntEdt,
  slctCponDlg,
  slctRowItemDlg,
  coupons,
  couponEdt,
  coupon,
  groundSigns,
  lndScrEdt,
  confirmUpdateDlg,
})
