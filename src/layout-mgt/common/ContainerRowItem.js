import I from 'immutable'
import uuid from 'uuid'

import ImgUpld from '../../common/ImgUpld.js'
import VdoUpld from '../../common/VdoUpld.js'

const _ContainerRowItem = I.Record({
  title: '',
  style: 'descPictures',
  description: '',
  thumb: undefined,
  pictures: I.OrderedMap(),
  video: new VdoUpld(),
})

export default class ContainerRowItem extends _ContainerRowItem {
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
    if (obj.video) {
      obj.video = new VdoUpld(obj.video)
    }

    super(obj)
  }

  dump() {
    let ret = {
      thumbUrl: this.thumb.get('url'),
      style: this.style,
    }
    if (this.title) {
      ret.title = this.title
    }

    if (this.style === 'descPictures') {
      if (this.description) {
        ret.description = this.description
      }
      ret.pictures = this.pictures.valueSeq().map(x => x.get('url')).filter(x => x).toJS()
    } else if (this.style === 'video') {
      ret.video = this.video.dump()
    }

    return ret
  }

  validate() {
    return this.thumb && this.thumb.get('url')
      && (
        this.style === 'descPictures'
        && this.pictures.some(x => x.get('url'))
        ||
        this.style === 'video'
        && this.video.validate()
      )
  }
}
