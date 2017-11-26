import { get, patch } from '.'

export function getAll() {
  return get('/wc/model/v1/plans')
}

export function update(id, body) {
  return patch(`/wc/model/v1/plans/${id}`, body)
}

export function getUpdateDetails(id) {
  return get(`/wc/model/v1/plans/${id}/modifiedModels`)
}
