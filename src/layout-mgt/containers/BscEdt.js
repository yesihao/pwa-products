import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import BscEdt from '../components/BscEdt.js'
import actions from '../actions/bscEdt.js'

import fenum from '../common/modelFunctionEnum.js'
import cenum from '../common/modelClassificationEnum.js'

const selector = createStructuredSelector({
  editingType: (_, y) => y,
  name: x => x.get('name'),
  typeText: x => `${fenum[x.get('function')]} : ${cenum[x.get('classification')]}`,
  screenshot: x => x.get('screenshot'),
  readonly: x => x.get('readonly'),
})

export default connect(
  (state, ownProps) => {
    return selector(state.getIn(['layoutMgt', 'bscEdt']), ownProps.editingType)
  },
  actions
)(BscEdt)
