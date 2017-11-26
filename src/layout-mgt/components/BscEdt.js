import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import styles from './BscEdt.scss'

export default class BscEdt extends PureComponent {
  render() {
    const {
      name, typeText, children, screenshot, editingType, readonly, invalid,
      changeName, save, cancel,
    } = this.props

    return (
      <div style={{width: 400}}>
        <div className="tile is-vertical is-parent">
          <div className="columns">
            <div className="column">
              <figure className="image">
                <img className={styles.img} src={screenshot} />
              </figure>
            </div>
          </div>
          <div className="field">
            <label className="label">类型</label>
            <p>{typeText}</p>
          </div>
          <div className="field">
            <label className="label">名称<span className="has-text-danger">*</span></label>
            <div className="control">
              <input placeholder="请填写一个名字，以便进行区分（最多10个字）"
                className="input"
                type="text"
                maxLength="10"
                value={name}
                onChange={e => changeName(e.target.value)}
              />
            </div>
          </div>

          {children}

          { !readonly &&
            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link is-outlined"
                  onClick={() => save(editingType)}
                  disabled={invalid}
                >
                  保存
                </button>
              </div>
              <div className="control">
                <button className="button is-white" onClick={cancel}>取消</button>
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}

BscEdt.propTypes = {
  children: PropTypes.node,
  editingType: PropTypes.string.isRequired,
  typeText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  screenshot: PropTypes.string.isRequired,
  readonly: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,

  changeName: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
}
