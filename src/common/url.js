export function getSearchStringParams(searchStr) {
  let params = {}

  if (searchStr.length > 1) {
    for (let aItKey, nKeyId = 0, aCouples = searchStr.substr(1).split('&'); nKeyId < aCouples.length; nKeyId++) {
      aItKey = aCouples[nKeyId].split('=')
      params[decodeURIComponent(aItKey[0])] = aItKey.length > 1 ? decodeURIComponent(aItKey[1]) : ''
    }
  }
  return params
}
