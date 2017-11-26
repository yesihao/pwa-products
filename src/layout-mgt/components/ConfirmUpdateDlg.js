import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import styles from './ConfirmUpdateDlg.scss'

export default class ConfirmUpdateDlg extends PureComponent {
  render() {
    const {
      added, modified, deleted,
      confirm, cancel,
    } = this.props

    return (
      <div className="modal-content">
        <div className="columns is-marginless is-centered">
          <div className="column is-7 is-paddingless">
            <div className="message is-dark">
              <div className="message-header">
                <span>　</span>
                <button className="delete" onClick={() => cancel()} />
              </div>
              <div className="message-body">
                距上次更新（当前店面布置），下列模型发生变化：
                { added.length > 0 &&
                  <section>
                    <p className={styles.label}>新增</p>
                    <ul className={styles.list}>
                      { added.map((i, idx) => (
                        <li key={idx}>{idx+1})&nbsp;{i.name}</li>
                      )) }
                    </ul>
                  </section>
                }
                { modified.length > 0 &&
                  <section>
                    <p className={styles.label}>修改</p>
                    <ul className={styles.list}>
                      { modified.map((i, idx) => (
                        <li key={idx}>{idx+1})&nbsp;{i.name}</li>
                      )) }
                    </ul>
                  </section>
                }
                { deleted.length > 0 &&
                  <section>
                    <p className={styles.label}>删除</p>
                    <ul className={styles.list}>
                      { deleted.map((i, idx) => (
                        <li key={idx}>{idx+1})&nbsp;{i.name}</li>
                      )) }
                    </ul>
                  </section>
                }
                <div className="field is-grouped is-grouped-right">
                  <div className="control">
                    <button className="button is-link is-outlined" onClick={() => confirm()}>
                      确定
                    </button>
                  </div>
                  <div className="control">
                    <button className="button is-white" onClick={() => cancel()}>
                      取消
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

ConfirmUpdateDlg.propTypes = {
  added: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
  modified: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
  deleted: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,

  confirm: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
}
