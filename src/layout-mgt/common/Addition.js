import I from 'immutable'
import uuid from 'uuid'

import ImgUpld from '../../common/ImgUpld.js'
import VdoUpld from '../../common/VdoUpld.js'

const _Addition = I.Record({
  style: 'descPictures',
  title: '',
  description: '',
  pictures: I.OrderedMap(),
  text: '',
  corner: undefined,
  video: new VdoUpld(),
})

export default class Addition extends _Addition {
  constructor(obj={}) {
    if (obj.pictures) {
      obj.pictures = I.OrderedMap(obj.pictures.map(x => {
        const id = uuid()
        return [id, new ImgUpld({ id, url: x })]
      }))
    }
    if (obj.corner) {
      obj.corner = new ImgUpld({ id: uuid(), url: obj.corner })
    }
    if (obj.video) {
      obj.video = new VdoUpld(obj.video)
    }

    super(obj)
  }

  dump() {
    let ret = {
      style: this.style,
    }
    if (this.title) {
      ret.title = this.title
    }
    if (this.style === 'descPictures') {
      ret.pictures = this.pictures.valueSeq().filter(x => x.get('url')).map(x => x.get('url')).toJS()
      if (this.description) {
        ret.description = this.description
      }
    } else if (this.style === 'cornerText') {
      ret.text = this.text
      if (this.corner) {
        ret.corner = this.corner.get('url')
      }
    } else if (this.style === 'video') { 
      ret.video = this.video.dump()
    }

    return ret
  }

  validate() {
    return this.style
      && (
        this.style === 'descPictures'
        && this.pictures.some(x => x.get('url'))
        ||
        this.style === 'cornerText'
        && this.text.length > 0
        ||
        this.style === 'video'
        && this.video.validate()
      )
  }
}
