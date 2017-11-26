import I from 'immutable'

const _VdoUpld = I.Record({
  videoUrl: undefined,
  coverUrl: undefined,
  width: undefined,
  height: undefined,
})

export default class VdoUpld extends _VdoUpld {
  dump() {
    return this.toJS()
  }

  validate() {
    return this.videoUrl !== undefined
      && this.coverUrl !== undefined
      && this.width !== undefined
      && this.height !== undefined
  }
}
