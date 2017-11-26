import I from 'immutable'
import uuid from 'uuid'

import VdoUpld from '../../common/VdoUpld.js'

const _LndScrEdt = I.Record({
  style: 'picture',
  pictures: I.OrderedMap(),
  video: new VdoUpld(),
})

class LndScrEdt extends _LndScrEdt {
  constructor(obj={}) {
    if (obj.pictures) {
      obj.pictures = I.OrderedMap(obj.pictures.map(x => {
        const id = uuid()
        return [id, I.Map({ id, url: x })]
      }))
    }
    if (obj.video) {
      obj.video = new VdoUpld(obj.video)
    }

    super(obj)
  }

  dump() {
    let ret = {
      style: this.style
    }

    if (this.style === 'picture') {
      ret.pictures = this.pictures.valueSeq().map(x => x.get('url')).filter(x => x).toJS()
    } else if (this.style === 'video') {
      ret.videos = [this.video.dump()]
    }

    return ret
  }

  validate() {
    return this.style === 'picture'
      && this.pictures.some(x => x.get('url'))
      ||
      this.style === 'video'
      && this.video.validate()
  }
}

export default LndScrEdt
