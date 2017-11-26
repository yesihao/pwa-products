import I from 'immutable'

const _ImgUpld = I.Record({
  id: undefined,
  url: undefined,
  loading: false,
})

export default class ImgUpld extends _ImgUpld {
  dump() {
    return {
      url: this.get('url')
    }
  }
}
