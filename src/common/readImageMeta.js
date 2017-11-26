export default function (file) {
  const url = URL.createObjectURL(file)
  return readImageMetaFromURL(url, () => URL.revokeObjectURL(url))
}

export function readImageMetaFromURL(url, cb) {
  return new Promise((res, rej) => {
    const img = new Image()

    img.src = url
    img.onload = () => {
      cb && cb()
      res({
        width: img.naturalWidth,
        height: img.naturalHeight,
      })
    }
    img.onerror = (e) => {
      cb && cb()
      rej(e)
    }
  })
}
