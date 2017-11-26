import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { formatDate } from 'tjs'

import Void from '../../components/Void.js'

import styles from './SlctCponDlg.scss'

export default class SlctCponDlg extends PureComponent {
  render() {
    const {
      cpons, slcted,
      chgCpon, confirm, cancel,
    } = this.props
    const slctedPon = cpons.filter(x => x.id === slcted)[0]

    return (
      <div className="modal-content">
        <div className="columns is-marginless is-centered">
          <div className="column is-7 is-paddingless">
            <div className="message is-dark">
              <div className="message-header">
                添加优惠券
                <button className="delete" onClick={() => cancel()} />
              </div>
              <div className="message-body">
                <div className="field">
                  <label className="label">优惠券</label>
                  <div className="control is-expanded">
                    <div className="select is-fullwidth">
                      <select value={slcted} onChange={e => chgCpon(e.target.value)}>
                        { !slcted &&
                          <option>请选择</option>
                        }
                        { cpons.map(x => (
                          <option key={x.id} value={x.id}>{x.name}</option>
                        )) }
                      </select>
                    </div>
                  </div>
                </div>

                { slctedPon &&
                  <Void>
                    <div className="field is-horizontal has-text-grey">
                      <div className={classnames('field-label', styles.label)}>
                        <label className="label has-text-weight-normal">起始时间</label>
                      </div>
                      <div className="field-body">
                        <span>{formatDate(new Date(slctedPon.startTime * 1000), 'yyyy-MM-dd HH:mm:ss')}</span>
                      </div>
                    </div>
                    <div className="field is-horizontal has-text-grey">
                      <div className={classnames('field-label', styles.label)}>
                        <label className="label has-text-weight-normal">结束时间</label>
                      </div>
                      <div className="field-body">
                        <span>{formatDate(new Date(slctedPon.endTime * 1000), 'yyyy-MM-dd HH:mm:ss')}</span>
                      </div>
                    </div>
                    <div className="field is-horizontal has-text-grey">
                      <div className={classnames('field-label', styles.label)}>
                        <label className="label has-text-weight-normal">面额</label>
                      </div>
                      <div className="field-body">
                        <span>{slctedPon.value}</span>
                      </div>
                    </div>
                    <div className="field is-horizontal has-text-grey">
                      <div className={classnames('field-label', styles.label)}>
                        <label className="label has-text-weight-normal">使用条件</label>
                      </div>
                      <div className="field-body">
                        { slctedPon.minConsume ?
                          <span>订单满{slctedPon.minConsume}元</span>
                          :
                          <span>不限制</span>
                        }
                      </div>
                    </div>
                  </Void>
                }

                { !slcted &&
                  <section className="hero field">
                    <div className={classnames('hero-body', styles.hero)}>
                      <div className="level">
                        <div className="level-item has-text-grey-light">
                          选择优惠券以查看详情
                        </div>
                      </div>
                    </div>
                  </section>
                }

                <div className="field is-grouped is-grouped-right">
                  <div className="control">
                    <button className="button is-link is-outlined"
                      onClick={() => confirm()}
                      disabled={!slcted}
                    >
                      确定
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SlctCponDlg.propTypes = {
  cpons: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    minConsume: PropTypes.number,
    value: PropTypes.number.isRequired,
    startTime: PropTypes.number.isRequired,
    endTime: PropTypes.number.isRequired,
  })).isRequired,
  slcted: PropTypes.string,

  chgCpon: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
}
