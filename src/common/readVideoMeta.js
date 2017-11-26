export default function (file) {
  return new Promise((res, rej) => {
    const video = document.createElement('video')
    const url = URL.createObjectURL(file)

    video.src = url
    video.onloadeddata = () => {
      URL.revokeObjectURL(url)
      res({
        width: video.videoWidth,
        height: video.videoHeight,
      })
    }
    video.onerror = (e) => {
      URL.revokeObjectURL(url)
      rej(e)
    }
  })
}
