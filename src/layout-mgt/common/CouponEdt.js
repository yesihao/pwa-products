import I from 'immutable'
import { formatDate } from 'tjs'

const requried = ['name', 'value', 'total', 'startTime', 'endTime', 'limit']

const File = I.Record({
  name: '',
  converting: false,
  codeBase64: undefined,
  errUrl: '',
})

const _CouponEdt = I.Record({
  name: '',
  value: undefined,
  total: undefined,
  limit: undefined,
  startTime: '',
  endTime: '',
  minConsume: undefined,
  limitation: undefined,
  comment: '',
  file: new File(),
  id: '',
  status: undefined,
  expire: undefined,
  loading: true,
})

class CouponEdt extends _CouponEdt {
  constructor(obj={}) {
    if (obj.minConsume) {
      obj.limitation = obj.minConsume ? true : false
    }
    if (obj.startTime) {
      obj.startTime = formatDate(new Date(obj.startTime * 1000), 'yyyy-MM-dd*HH:mm:ss').replace('*', 'T')
    }
    if (obj.endTime) {
      obj.endTime = formatDate(new Date(obj.endTime * 1000), 'yyyy-MM-dd*HH:mm:ss').replace('*', 'T')
    }
    if (obj.codeBase64) {
      obj.file = new File({ codeBase64: obj.codeBase64 })
    }

    super(obj)
  }

  dump() {
    let body = {
      name: this.name,
      value: this.value,
      total: this.total,
      startTime: Date.parse(this.startTime) / 1000,
      endTime: Date.parse(this.endTime) / 1000,
      limit: this.limit,
    }
    if (this.limitation) {
      body.minConsume = this.minConsume
    }
    if (this.file.codeBase64) {
      body.codeBase64 = this.file.codeBase64
    }
    if (this.comment) {
      body.comment = this.comment
    }

    return body
  }

  validateDate() {
    return Date.parse(this.endTime) - Date.parse(this.startTime) > 0
  }

  validate() {
    if (this.limitation === false) {
      return requried.every(k => this.get(k))
    } else if (this.limitation === true) {
      return requried.every(k => this.get(k)) && this.get('minConsume') > 0
    } else {
      return false
    }
  }
}

export default CouponEdt
export {
  File
}
