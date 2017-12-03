import WooCommerceAPI from 'woocommerce-api'
import { setCookie, getCookie } from 'tjs'

export const wc = new WooCommerceAPI({
  url: 'http://api.yesihao.tk/',
  consumerKey: 'ck_7946e9600033cc47388056d899084b09b88bcf0d',
  consumerSecret: 'cs_b6c9d84cc8b4021bbc7c2f1e89eb49eab138458d',
  wpAPI: true,
  version: 'wc/v2'
})
export const getWcApi = (_endpoint, params) => {
  let endpoint
  if (params) {
    let queries = []
    Object.keys(params).map(p => {
      queries.push(`${p}=${params[p]}`)
    })
    endpoint = `${_endpoint}?${queries.join('&')}`
  } else {
    endpoint = _endpoint
  }

  return wc.getAsync(endpoint).then(function(result) {
    let { statusCode, body, headers } = result.toJSON()
    if (statusCode === 200) {
      body = JSON.parse(body)
      return Promise.resolve({ body, headers })
    } else {
      return Promise.reject(statusCode)
    }
  })
}

export const wp = new WooCommerceAPI({
  url: 'http://api.yesihao.tk/',
  consumerKey: 'ck_7946e9600033cc47388056d899084b09b88bcf0d',
  consumerSecret: 'cs_b6c9d84cc8b4021bbc7c2f1e89eb49eab138458d',
  wpAPI: true,
  version: 'wp/v2'
})
export const getWpApi = (_endpoint, params) => {
  let endpoint
  if (params) {
    let queries = []
    Object.keys(params).map(p => {
      queries.push(`${p}=${params[p]}`)
    })
    endpoint = `${_endpoint}?${queries.join('&')}`
  } else {
    endpoint = _endpoint
  }

  return wp.getAsync(endpoint).then(function(result) {
    let { statusCode, body, headers } = result.toJSON()
    if (statusCode === 200) {
      body = JSON.parse(body)
      return Promise.resolve({ body, headers })
    } else {
      return Promise.reject(statusCode)
    }
  })
}

const ORIGIN = process.env.ORIGIN || `${window.location.origin}/api`

function _ts() {
  return Math.floor(Date.now()/1000)
}

function _url(path) {
  let [base, query] = path.split('?')
  let params = []
  let session = getCookie('s')
  if (query) {
    params = query.split('&')
  }
  params.push([
    'ts', encodeURIComponent(_ts())
  ].join('='))
  if (session) {
    params.push([
      'session', encodeURIComponent(session)
    ].join('='))
  }

  return [ORIGIN, base, '?', params.join('&')].join('')
}

function _xhr(method, path, resolve, reject) {
  let xhr = new XMLHttpRequest()
  xhr.open(method , _url(path), true)
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
  xhr.onload = () => {
    if (xhr.status === 200) {
      let res = JSON.parse(xhr.responseText)

      if (res.ret === 0) {
        resolve(res)
      } else if (res.result) {
        reject(res)
      } else {
        reject(res.ret)
      }
    } else {
      reject(-1)
    }
  }
  xhr.onerror = () => {
    reject(-1)
  }
  return xhr
}

export function setSession(session) {
  setCookie('session', session)
}

export function get(path) {
  return new Promise((resolve, reject) => {
    let xhr = _xhr('GET', path, resolve, reject)
    xhr.send()
  })
}

export function post(path, body) {
  return new Promise((resolve, reject) => {
    let xhr = _xhr('POST', path, resolve, reject)
    xhr.send(JSON.stringify(body))
  })
}

export function put(path, body) {
  return new Promise((resolve, reject) => {
    let xhr = _xhr('PUT', path, resolve, reject)
    xhr.send(JSON.stringify(body))
  })
}

export function del(path, body) {
  return new Promise((resolve, reject) => {
    let xhr = _xhr('DELETE', path, resolve, reject)
    xhr.send(JSON.stringify(body))
  })
}

export function patch(path, body) {
  return new Promise((resolve, reject) => {
    let xhr = _xhr('PATCH', path, resolve, reject)
    xhr.send(JSON.stringify(body))
  })
}
