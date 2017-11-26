import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import urls from '../../urls.js'
import Aside from '../../components/Aside.js'

const GROUPS = [
  {
    label: '我的门店',
    links: [
      { text: '我的方案', url: urls.layoutmgtShowall() },
    ]
  },
  {
    label: 'AR模型',
    links: [
      { text: '编辑与管理', url: urls.layoutmgtDetails('') },
    ]
  },
  {
    label: '地贴',
    links: [
      { text: '地贴管理', url: urls.layoutmgtGroundSigns('') },
    ]
  },
  {
    label: '营销',
    links: [
      { text: '优惠券管理', url: urls.layoutmgtCoupons() },
    ]
  },
  {
    label: '账号',
    links: [
      { text: '账号设置', url: urls.userSettings() },
    ]
  },
]

export default class LayoutMgt extends PureComponent {
  render() {
    const { children } = this.props
    return (
      <div className="columns">
        <Aside className="column is-2" groups={GROUPS} />
        {children}
      </div>
    )
  }
}

LayoutMgt.propTypes = {
  children: PropTypes.node,
}
