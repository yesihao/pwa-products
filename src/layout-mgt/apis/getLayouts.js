import { get } from '../../apis'

export default () => {
  return get('/wca/model/v1/plans')
}
