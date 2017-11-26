import I from 'immutable'
import uuid from 'uuid'

import ImgUpld from '../../common/ImgUpld.js'

const _SlctRowItemDlg = I.Record({
  title: '',
  description: '',
  thumb: undefined,
  pictures: I.OrderedMap()
})

class SlctRowItemDlg extends _SlctRowItemDlg {
  constructor(obj={}) {
    if (obj.thumbUrl) {
      obj.thumb = new ImgUpld({ id: uuid(), url: obj.thumbUrl })
    }
    if (obj.pictures) {
      obj.pictures = I.OrderedMap(obj.pictures.map(x => {
        const id = uuid()
        return [id, new ImgUpld({ id, url: x })]
      }))
    }
    super(obj)
  }

  dump() {
    return {
      title: this.title,
      description: this.description,
      thumbUrl: this.thumb.get('url'),
      pictures: this.pictures.valueSeq().map(x => x.get('url')).filter(x => x).toJS(),
    }
  }

  validate() {
    return this.title.length > 0 &&
      this.description.length > 0 &&
      this.thumb && this.thumb.get('url') &&
      this.pictures.some(x => x.get('url'))
  }
}

export default SlctRowItemDlg
