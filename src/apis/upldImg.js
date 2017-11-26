import { get } from './index.js'

export default async function upldImg(file) {
  const ret = await get(`/wc/model/v1/upload?contentType=${file.type}`)
  const { ossUrl, url } = ret.result

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('PUT', ossUrl)
    xhr.setRequestHeader('Content-Type', file.type)
    xhr.send(file)

    xhr.onload = () => {
      resolve({ url })
    }
    xhr.onerror = () => reject(-1)
  })
}
