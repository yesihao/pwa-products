import { get } from '../../apis'

export default (id) => {
  return get(`/wc/model/v1/plans/${id}/entrances`)
}
