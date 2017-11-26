import I from 'immutable'

const _ConfirmUpdateDlg = I.Record({
  added: I.List(),
  modified: I.List(),
  deleted: I.List(),
  loading: true,
})

class ConfirmUpdateDlg extends _ConfirmUpdateDlg {
  constructor(obj={}) {
    if (obj.newModels) {
      obj.added = I.fromJS(obj.newModels)
      delete obj.newModels
    }
    if (obj.modifiedModels) {
      obj.modified = I.fromJS(obj.modifiedModels)
      delete obj.modifiedModels
    }
    if (obj.deletedModels) {
      obj.deleted = I.fromJS(obj.deletedModels)
      delete obj.deletedModels
    }
    super(obj)
  }
}

export default ConfirmUpdateDlg
