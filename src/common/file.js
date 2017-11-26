import base64js from 'base64-js'

export function readFileAsBase64(file) {
  return new Promise(function(resolve, reject) {
    let fr = new FileReader()
    fr.onerror = () => reject('读取文件失败')
    fr.onload = e => {
      let buffer = e.target.result
      let view = new Uint8Array(buffer)
      resolve(base64js.fromByteArray(view))
    }
    fr.readAsArrayBuffer(file)
  })
}
