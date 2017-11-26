import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import urls from '../../urls'

import styles from './Coupons.scss'
import Pagination from '../../components/Pagination'

const EXPIRE_MAP = {
  expired: '已过期',
  unexpired: '未过期',
}

export default class Coupons extends PureComponent {
  updateName = (e) => {
    const { updateFilters } = this.props
    updateFilters('name', e.target.value)
  }
  updateKeyword = () => {
    const { name, updateFilters } = this.props
    updateFilters('keyword', name.toLowerCase())
  }

  update = (k, isNum) => {
    const { updateFilters } = this.props
    return (e) => updateFilters(k, isNum ? parseInt(e.target.getAttribute('data-value')) : e.target.getAttribute('data-value'))
  }
  updateExpire = (e) => {
    const { updateFilters } = this.props
    updateFilters('expire', e.target.getAttribute('data-value'))
  }

  renderFilters() {
    const { name, expire, resetFilters } = this.props

    return (
      <div className="columns">
        <div className="column is-3">
          <div className="field is-grouped">
            <p className="control">
              <input value={name} onChange={this.updateName} className="input is-small" types="text" placeholder="搜索优惠券名称" />
            </p>
            <p className="control">
              <a className="button is-small is-warning" onClick={this.updateKeyword}>搜索</a>
            </p>
          </div>
        </div>
        <div className="column is-2">
          <span className="icon">
            <i className="fa fa-empire" aria-hidden="true"></i>
          </span>
          <div className="dropdown is-hoverable">
            <div className="dropdown-trigger">
              <button className="button is-small" aria-haspopup="true" aria-controls="dropdown-menu3">
                <span className="icon is-small">
                  <i className="fa fa-caret-down" aria-hidden="true"></i>
                </span>
                <span>{expire ? EXPIRE_MAP[expire] : '全部'}</span>
              </button>
            </div>
            <div className="dropdown-menu" role="menu">
              <div className="dropdown-content">
                {
                  expire &&
                  <a className="dropdown-item is-size-7" data-value="" onClick={this.updateExpire}>全部</a>
                }
                {
                  expire !== 'expired' &&
                  <a className="dropdown-item is-size-7" data-value="expired" onClick={this.updateExpire}>已过期</a>
                }
                {
                  expire !== 'unexpired' &&
                  <a className="dropdown-item is-size-7" data-value="unexpired" onClick={this.updateExpire}>未过期</a>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="column is-5">
          <a className="button is-small" onClick={resetFilters}>重置</a>
        </div>
        <div className="column is-2">
          <div className="level">
            <div className="level-left">
            </div>
            <div className="level-right">
              <Link to={urls.layoutmgtCouponAdd()} className="button is-primary is-small">+新建优惠券</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderResults() {
    const { results, page, pageSize, total, pageTo, changePageSize, activate } = this.props

    return (
      <div>
        <div className={styles.listContainer}>
          {
            total > 0 ?
              <div>
                <table className="table is-fullwidth is-striped">
                  <thead>
                    <tr>
                      <th className="has-text-centered">序号</th>
                      <th className="has-text-centered">优惠卷名称</th>
                      <th className="has-text-centered">有效期</th>
                      <th className="has-text-centered">状态</th>
                      <th className="has-text-centered">面额</th>
                      <th className="has-text-centered">有效条件</th>
                      <th className="has-text-centered">每人领取上限</th>
                      <th className="has-text-centered">已使用／已领取／总张数</th>
                      <th className="has-text-centered">最后编辑时间</th>
                      <th className="has-text-centered">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      results.map(result =>
                        <tr key={result.id}>
                          <td className="has-text-centered is-middle">{result.sId}</td>
                          <td className="has-text-centered is-middle">{result.name}</td>
                          <td className="has-text-centered is-middle">
                            <p>{result.startTimeString}</p>
                            <p className={styles.separator}>-</p>
                            <p>{result.endTimeString}</p>
                          </td>
                          <td className="has-text-centered is-middle">{result.expire ? '已过期' : '未过期'}</td>
                          <td className="has-text-centered is-middle">{`${result.value}元`}</td>
                          <td className="has-text-centered is-middle">{result.minConsume !== undefined ? `满${result.minConsume}元` : '无限制'}</td>
                          <td className="has-text-centered is-middle">{`每人${result.limit}张`}</td>
                          <td className="has-text-centered is-middle">{`${result.useCount}/${result.drawCount}/${result.total}`}</td>
                          <td className="has-text-centered is-middle">{result.updateTimeString}</td>
                          <td className="has-text-centered is-middle">
                            <div className="field has-addons has-addons-centered">
                              <p className="control">
                                <Link to={urls.layoutmgtCouponDetails(result.id)} className="button is-small">查看</Link>
                              </p>
                              {
                                (result.status === 2 && result.drawCount <= 0) &&
                                <p className="control">
                                  <Link to={urls.layoutmgtCouponEdt(result.id)} className="button is-small">编辑</Link>
                                </p>
                              }
                              {
                                result.status === 2 ?
                                  <p className="control">
                                    <a className="button is-small" onClick={() => activate(result.id, 1)}>开启领取</a>
                                  </p>
                                  :
                                  <p className="control">
                                    <a className="button is-small" onClick={() => activate(result.id, 2)}>关闭领取</a>
                                  </p>
                              }
                            </div>
                          </td>
                        </tr>
                      )
                    }
                  </tbody>
                </table>
                <Pagination totalPages={Math.ceil(total / pageSize)}
                  size="small"
                  currentAt={page}
                  onPage={pageTo}
                  totalItems={total}
                  pageSizes={[10, 15, 20, 25, 30]}
                  pageSize={pageSize}
                  onChangePageSize={changePageSize}
                />
              </div>
              :
              <div className="level">
                <h1 className={classnames('level-item', 'title', 'is-4', 'has-text-grey-light', styles.title)}>当前分类下，搜索无结果</h1>
              </div>
          }
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="column is-10 is-size-7">
        {this.renderFilters()}
        {this.renderResults()}
      </div>
    )
  }
}

Coupons.propTypes = {
  name: PropTypes.string.isRequired,
  expire: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  results: PropTypes.array.isRequired,

  updateFilters: PropTypes.func.isRequired,
  resetFilters: PropTypes.func.isRequired,
  pageTo: PropTypes.func.isRequired,
  changePageSize: PropTypes.func.isRequired,
  activate: PropTypes.func.isRequired,
}
