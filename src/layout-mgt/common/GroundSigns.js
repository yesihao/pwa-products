import I from 'immutable'
import uuid from 'uuid'

import ImgUpld from '../../common/ImgUpld.js'

const _GroundSigns = I.Record({
  entranceIds: I.List(),
  loading: true,
  pictures: I.OrderedMap(),
  initPictures: I.OrderedMap(),
})

class GroundSigns extends _GroundSigns {
  constructor(obj={}) {
    if (obj.pictures) {
      obj.pictures = I.OrderedMap(obj.pictures.map(x => {
        const id = uuid()
        return [id, new ImgUpld({ id, url: x })]
      }))
      obj.initPictures = obj.pictures
    }
    if (obj.entranceIds) {
      obj.entranceIds = I.List(obj.entranceIds)
    }
    super(obj)
  }

  dump(id, url) {
    return {
      entranceIds: this.entranceIds,
      pictures: this.pictures.update(id, p => p.set('url', url)).valueSeq().map(p => p.get('url')),
    }
  }
}

export default GroundSigns
