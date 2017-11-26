import {
  updateAdt,
  updateCnt,
  updateGsp,
  updateShwScr,
  updateLndScr,
} from '../apis/updateModel'

import AdtEdt from '../containers/AdtEdt'
import CntEdt from '../containers/CntEdt'
import GspEdt from '../containers/GspEdt'
import ShwScrEdt from '../containers/ShwScrEdt'
import LndScrEdt from '../containers/LndScrEdt'

export const DISPLAY_MAP = {
  table: '列表',
  view: '俯视图',
}

export const STATUS_MAP = {
  1: '待编辑',
  2: '已完成',
}

export const TYPE_MAP = {
  exhibition: '展示模型',
  decoration: '装饰元素',
  marketing: '营销模型',
}

export const CLASSFICATION_MAP = {
  container: '货柜',
  addition: '补充瓷砖',
  showScreen: '试衣秀屏',
  landingScreen: '落地屏',
  snowflake: '雪花模型',
  ChristmasTree: '圣诞树模型',
  SantaClaus: '圣诞老人模型',
  balloon:' 气球模型',
  gashapon: '扭蛋机'
}

export const PLAN_STATUS_MAP = {
  0: '已删除',
  1: '未创建入口',
  2: '未上线',
  3: '正在使用',
  4: '有变更',
}

export const EDIT_CLASS_MAP = {
  addition: [AdtEdt, updateAdt],
  container: [CntEdt, updateCnt],
  gashapon: [GspEdt, updateGsp],
  showScreen: [ShwScrEdt, updateShwScr],
  landingScreen: [LndScrEdt, updateLndScr],
}
