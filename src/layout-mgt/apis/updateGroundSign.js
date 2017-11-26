import { patch } from '../../apis'

export default (id, pictures) => {
  return patch(`/wc/model/v1/entrance/${id}`, pictures)
}
