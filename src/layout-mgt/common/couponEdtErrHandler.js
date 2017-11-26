export default function(e, type) {
  switch (e) {
  case 0x00120001:
    return '优惠券不存在'
  case 0x00120002:
    return '存在重复编码'
  case 0x00120003:
    return '优惠券正在使用'
  case 0x00120004:
    return '优惠券已过期'
  case 0x00120005:
    return '上传的xlsx格式有错误'
  case 0x00120006:
    return '编码数量有错误'
  case 0x00120007:
    return '存在数字或字母以外的字符'
  case 0x00120008:
    return '编码需要在6-20字符之间'
  case 0x00120009:
    return '编码有错误'
  default:
    return `优惠券${type}失败`
  }
}
