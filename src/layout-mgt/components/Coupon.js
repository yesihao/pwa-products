import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getCookie } from 'tjs'

import Pagination from '../../components/Pagination'
import couponAvaEnum from '../common/couponAvaEnum'
import couponStatusEnum from '../common/couponStatusEnum'

export default class Coupon extends PureComponent {
  render() {
    const {
      name, value, total, limit, startTime, endTime, minConsume, comment, status, updateTime,
      codes, codePage, codePageSize, codeTotal, codePageTo,
    } = this.props

    return (
      <div className="tile is-ancestor">
        <div className="tile is-vertical is-parent">

          <div className="tile is-child">
            <h1 className="title is-size-5">基本信息</h1>
            <div className="box">
              <div className="level">
                <div className="level-left">
                  <span className="level-item">优惠券名称：</span>
                  <span className="level-item">{name}</span>
                </div>
              </div>
              <div className="level">
                <div className="level-left">
                  <span className="level-item">优惠券面额：</span>
                  <span className="level-item">{`${value}元`}</span>
                </div>
              </div>
              <div className="level">
                <div className="level-left">
                  <span className="level-item">优惠券张数：</span>
                  <span className="level-item">{`${total}张`}</span>
                </div>
              </div>
              <div className="level">
                <div className="level-left">
                  <span className="level-item">可用时间：</span>
                  <span className="level-item">{`${startTime} - ${endTime}`}</span>
                </div>
              </div>
              <div className="level">
                <div className="level-left">
                  <span className="level-item">状态：</span>
                  <span className="level-item">{couponAvaEnum[status]}</span>
                </div>
              </div>
              <div className="level">
                <div className="level-left">
                  <span className="level-item">最后更新时间：</span>
                  <span className="level-item">{updateTime}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="tile is-child">
            <h1 className="title is-size-5">规则</h1>
            <div className="box">
              <div className="level">
                <div className="level-left">
                  <span className="level-item">每人限领张数：</span>
                  <span className="level-item">{`${limit}张`}</span>
                </div>
              </div>
              <div className="level">
                <div className="level-left">
                  <span className="level-item">使用条件：</span>
                  <span className="level-item">{minConsume ? `订单满${minConsume}元` : '无限制'}</span>
                </div>
              </div>
              <div className="level">
                <div className="level-left">
                  <span className="level-item">可用门店：</span>
                  <span className="level-item">{`仅${getCookie('store')}`}</span>
                </div>
              </div>
            </div>
          </div>

          {
            comment &&
            <div className="tile is-child">
              <h1 className="title is-size-5">备注</h1>
              <div className="box">
                <div className="level">
                  <div className="level-left">
                    <span className="level-item">{comment}</span>
                  </div>
                </div>
              </div>
            </div>
          }

          <div className="tile is-child">
            <h1 className="title is-size-5">明细</h1>
            <div className="box">
              {
                codes.length > 0 ?
                  <div>
                    <table className="table is-fullwidth is-striped">
                      <thead>
                        <tr>
                          <th className="has-text-centered">优惠卷编号</th>
                          <th className="has-text-centered">状态</th>
                          <th className="has-text-centered">用户ID</th>
                          <th className="has-text-centered">领取时间</th>
                          <th className="has-text-centered">使用时间</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          codes.map(code =>
                            <tr key={code.code}>
                              <td className="has-text-centered is-middle">{code.code}</td>
                              <td className="has-text-centered is-middle">{couponStatusEnum[code.status]}</td>
                              <td className="has-text-centered is-middle">{code.userId ? code.userId : '-'}</td>
                              <td className="has-text-centered is-middle">{code.drawTime ? code.drawTime : '-'}</td>
                              <td className="has-text-centered is-middle">{code.usedTime ? code.usedTime : '-'}</td>
                            </tr>
                          )
                        }
                      </tbody>
                    </table>
                    <Pagination totalPages={Math.ceil(codeTotal / codePageSize)}
                      size="small"
                      totalItems={codeTotal}
                      currentAt={codePage}
                      onPage={codePageTo}
                    />
                  </div>
                  :
                  <div className="level">
                    <h1 className="level-item title is-4 has-text-grey-light">暂无优惠券明细</h1>
                  </div>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Coupon.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  minConsume: PropTypes.number,
  comment: PropTypes.string,
  status: PropTypes.number.isRequired,
  updateTime: PropTypes.string.isRequired,
  codePage: PropTypes.number.isRequired,
  codePageSize: PropTypes.number.isRequired,
  codeTotal: PropTypes.number.isRequired,
  codes: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    userId: PropTypes.number,
    drawTime: PropTypes.string,
    usedTime: PropTypes.string,
    status: PropTypes.number.isRequired,
  })).isRequired,

  codePageTo: PropTypes.func.isRequired,
}
