import { put } from '../../apis'

export function updateAdt(modelId, entranceId, body) {
  return put(`/wc/model/v1/models/addition/${modelId}?entrance_id=${entranceId}`, body)
}

export function updateCnt(modelId, entranceId, body) {
  return put(`/wc/model/v1/models/container/${modelId}?entrance_id=${entranceId}`, body)
}

export function updateGsp(modelId, entranceId, body) {
  return put(`/wc/model/v1/models/marketing/${modelId}?entrance_id=${entranceId}`, body)
}

export function updateShwScr(modelId, entranceId, body) {
  return put(`/wc/model/v1/models/showScreen/${modelId}?entrance_id=${entranceId}`, body)
}

export function updateLndScr(modelId, entranceId, body) {
  return put(`/wc/model/v1/models/landingScreen/${modelId}?entrance_id=${entranceId}`, body)
}
