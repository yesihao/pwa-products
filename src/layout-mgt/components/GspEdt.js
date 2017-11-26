import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import BscEdt from '../containers/BscEdt.js'
import urls from '../../urls.js'
import Help from '../../components/Help.js'

const COUPON_VALID = 1
const COUPON_INACTIVE = 2
const COUPON_OUT_OF_DATE = 3

export default class GspEdt extends PureComponent {
  getCouponValue(x) {
    if (x.status === COUPON_VALID) {
      return x.ratio
    }
    if (x.status === COUPON_INACTIVE) {
      return '未开启'
    }
    if (x.status === COUPON_OUT_OF_DATE) {
      return '已过期'
    }
  }

  render() {
    const {
      coupons, total, invalid,
      selectCoupon, delCoupon, changeCouponRatio,
    } = this.props

    return (
      <BscEdt editingType="gspEdt" invalid={invalid}>
        <div className="field">
          <label className="label">
            设置<span className="has-text-danger">*</span>
            <Help>未中奖率将根据你添加的优惠券的中奖率动态调整，<br/>同时请确保中奖率设置一个1到100之间的数字</Help>
          </label>

          <div className="field has-addons">
            <div className="control">
              <span className="button is-static">未中奖率</span>
            </div>
            <div className="control is-expanded">
              <input className="input" type="text" readOnly value={total} />
            </div>
            <div className="control">
              <button className="button is-link" onClick={selectCoupon}>添加</button>
            </div>
          </div>
        </div>

        {
          coupons.map((x, idx) => (
            <div key={idx} className="field">
              <label className="label has-text-weight-normal has-text-grey">
                {x.name}&nbsp;
                <a href={urls.layoutmgtCouponDetails(x.id)} target="_blank">查看</a>
              </label>

              <div className="field has-addons">
                <div className="control">
                  <span className="button is-static">　中奖率</span>
                </div>
                <div className="control is-expanded">
                  <input className="input" type="text"
                    value={this.getCouponValue(x)}
                    onChange={e => changeCouponRatio(x.id, e.target.value)}
                    readOnly={x.status !== COUPON_VALID}
                  />
                </div>
                <div className="control">
                  <button className="button is-danger" onClick={() => delCoupon(x.id)}>删除</button>
                </div>
              </div>
            </div>
          ))
        }
      </BscEdt>
    )
  }
}

GspEdt.propTypes = {
  total: PropTypes.number.isRequired,
  coupons: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    ratio: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired,
  })).isRequired,
  invalid: PropTypes.bool.isRequired,

  selectCoupon: PropTypes.func.isRequired,
  delCoupon: PropTypes.func.isRequired,
  changeCouponRatio: PropTypes.func.isRequired,
}
