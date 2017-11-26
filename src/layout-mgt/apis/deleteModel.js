import { del } from '../../apis'

export default (modelId, planId, entranceId) => {
  return del(`/wc/model/v1/models/${modelId}?plan_id=${planId}&entrance_id=${entranceId}`)
}
