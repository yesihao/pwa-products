import { fromKeys } from 'reax'

export default fromKeys([
  // chgMobile(mobile: string)
  'LOGIN_CHG_MOBILE',
  // chgPasswd(passwd: string)
  'LOGIN_CHG_PASSWD',
  // setError(err: string)
  'LOGIN_SET_ERROR',
  // unload()
  'LOGIN_UNLOAD',

  'LAYOUT_MGT_DETAILS_LOADED',
  'LAYOUT_MGT_DETAILS_RESET',
  'LAYOUT_MGT_DETAILS_UPDATE_FILTERS',
  'LAYOUT_MGT_DETAILS_CHANGE_ORDER',
  'LAYOUT_MGT_DETAILS_RESET_FILTERS',
  'LAYOUT_MGT_DETAILS_PAGE_TO',
  'LAYOUT_MGT_DETAILS_CHANGE_PAGE_SIZE',
  'LAYOUT_MGT_DETAILS_UPDATE_CANVAS_SIZE',
  'LAYOUT_MGT_DETAILS_CLICK_MODEL',
  'LAYOUT_MGT_DETAILS_CHANGE_SCALE',

  // init(data: object)
  'LAYOUT_MGT_MODEL_EDITING_BSC_INIT',
  // changeName(name: string)
  'LAYOUT_MGT_MODEL_EDITING_COMMON_CHANGE_NAME',

  // init()
  'LAYOUT_MGT_MODEL_EDITING_GASHAPON_INIT',
  // addCoupon(id: string, name: string)
  'LAYOUT_MGT_MODEL_EDITING_GASHAPON_ADD_COUPON',
  // delCoupon(id: string)
  'LAYOUT_MGT_MODEL_EDITING_GASHAPON_DEL_COUPON',
  // changeCouponRatio(id: string, ratio: number)
  'LAYOUT_MGT_MODEL_EDITING_GASHAPON_CHANGE_COUPON_RATIO',

  // init(data: object)
  'LAYOUT_MGT_MODEL_EDITING_ADDITION_INIT',
  // changeStyle(style: string)
  'LAYOUT_MGT_MODEL_EDITING_ADDITION_CHANGE_STYLE',
  // changeTitle(title: string)
  'LAYOUT_MGT_MODEL_EDITING_ADDITION_CHANGE_TITLE',
  // changeDescription(desc: string)
  'LAYOUT_MGT_MODEL_EDITING_ADDITION_CHANGE_DESCRIPTION',
  // changeText(text: string)
  'LAYOUT_MGT_MODEL_EDITING_ADDITION_CHANGE_TEXT',
  // caa
  'LAYOUT_MGT_MODEL_EDITING_ADDITION_UPLOAD_IMAGE',
  // deleteImage(id: string)
  'LAYOUT_MGT_MODEL_EDITING_ADDITION_DELETE_IMAGE',
  // caa
  'LAYOUT_MGT_MODEL_EDITING_ADDITION_UPLOAD_CORNER',
  // deleteCorner()
  'LAYOUT_MGT_MODEL_EDITING_ADDITION_DELETE_CORNER',
  // chgVdo()
  'LAYOUT_MGT_MODEL_EDITING_ADDITION_CHG_VDO',

  // init()
  'LAYOUT_MGT_SLCT_CPON_DLG_INIT',
  // unload()
  'LAYOUT_MGT_SLCT_CPON_DLG_UNLOAD',
  // chgCpon(id: string)
  'LAYOUT_MGT_SLCT_CPON_DLG_CHG_CPON',

  // init()
  'LAYOUT_MGT_MODEL_EDITING_CNT_INIT',
  // swchRows(n: number)
  'LAYOUT_MGT_MODEL_EDITING_CNT_SWCH_ROWS',
  // chgCtg(ctg: string)
  'LAYOUT_MGT_MODEL_EDITING_CNT_CHG_CTG',
  // chgRowItem(rowIdx: number, itemIdx: number, item: ContainerRowItem)
  'LAYOUT_MGT_MODEL_EDITING_CNT_CHG_ROW_ITEM',
  // delRowItem(rowIdx: number, itemIdx: number)
  'LAYOUT_MGT_MODEL_EDITING_CNT_DEL_ROW_ITEM',

  // init()
  'LAYOUT_MGT_SLCT_ROW_ITEM_DLG_INIT',
  // chgTitle(title: string)
  'LAYOUT_MGT_SLCT_ROW_ITEM_DLG_CHG_TITLE',
  // chgStyle(style: string)
  'LAYOUT_MGT_SLCT_ROW_ITEM_DLG_CHG_STYLE',
  // chgDesc(desc: string)
  'LAYOUT_MGT_SLCT_ROW_ITEM_DLG_CHG_DESC',
  'LAYOUT_MGT_SLCT_ROW_ITEM_DLG_UPLD_PIC',
  // delPic(id: string)
  'LAYOUT_MGT_SLCT_ROW_ITEM_DLG_DEL_PIC',
  // caa
  'LAYOUT_MGT_SLCT_ROW_ITEM_DLG_UPLD_THM',
  // delThm()
  'LAYOUT_MGT_SLCT_ROW_ITEM_DLG_DEL_THM',
  // chgVdo()
  'LAYOUT_MGT_SLCT_ROW_ITEM_DLG_CHG_VDO',

  // init()
  'LAYOUT_MGT_SHOW_ALL_INIT',
  // unload()
  'LAYOUT_MGT_SHOW_ALL_UNLOAD',
  // reloadPlan(idx: number, plan: object)
  'LAYOUT_MGT_SHOW_ALL_RELOAD_PLAN',

  // init(data: object)
  'LAYOUT_MGT_MODEL_EDITING_LND_SCR_INIT',
  // changeStyle(style: string)
  'LAYOUT_MGT_MODEL_EDITING_LND_SCR_CHANGE_STYLE',
  // changeImage(id: string, image: string)
  'LAYOUT_MGT_MODEL_EDITING_LND_SCR_CHANGE_IMAGE',
  // delImage(id: string)
  'LAYOUT_MGT_MODEL_EDITING_LND_SCR_DEL_IMAGE',
  // addImages(files: File[])
  'LAYOUT_MGT_MODEL_EDITING_LND_SCR_ADD_IMAGES',
  // changeVideo(video: object)
  'LAYOUT_MGT_MODEL_EDITING_LND_SCR_CHANGE_VIDEO',

  // init()
  'LAYOUT_MGT_CONFIRM_UPDATE_DLG_INIT',
  // unload()
  'LAYOUT_MGT_CONFIRM_UPDATE_DLG_UNLOAD',

  'LAYOUT_MGT_COUPONS_LOADED',
  'LAYOUT_MGT_COUPONS_RESET',
  'LAYOUT_MGT_COUPONS_UPDATE_FILTERS',
  'LAYOUT_MGT_COUPONS_RESET_FILTERS',
  'LAYOUT_MGT_COUPONS_PAGE_TO',
  'LAYOUT_MGT_COUPONS_CHANGE_PAGE_SIZE',
  'LAYOUT_MGT_COUPONS_UPDATE_CANVAS_SIZE',

  'LAYOUT_MGT_COUPON_EDT_UPDATE_FIELDS',
  'LAYOUT_MGT_COUPON_EDT_CONVERT_FILE',
  'LAYOUT_MGT_COUPON_EDT_CLEAR_FILE',
  'LAYOUT_MGT_COUPON_EDT_SET_FILE_ERROR_URL',
  'LAYOUT_MGT_COUPON_EDT_LOADED',
  'LAYOUT_MGT_COUPON_EDT_RESET',
  'LAYOUT_MGT_COUPON_VIEW_LOADED',
  'LAYOUT_MGT_COUPON_VIEW_RESET',
  'LAYOUT_MGT_COUPON_VIEW_CODE_PAGE_TO',
  'LAYOUT_MGT_COUPON_VIEW_CODE_LOADED',

  'LAYOUT_MGT_GROUND_SIGNS_INIT',
  'LAYOUT_MGT_GROUND_SIGNS_UPLD_IMG',

  // chgOldPwd(pwd: string)
  'USER_PWD_CHG_OLD_PWD',
  // chgNewPwd(pwd: string)
  'USER_PWD_CHG_NEW_PWD',
  // chgCfmPwd(pwd: string)
  'USER_PWD_CHG_CFM_PWD',
  // setError(err: string)
  'USER_PWD_SET_ERROR',
  // unload()
  'USER_PWD_UNLOAD',
])