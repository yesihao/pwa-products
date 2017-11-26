import { setCookie, getCookie } from 'tjs'

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
