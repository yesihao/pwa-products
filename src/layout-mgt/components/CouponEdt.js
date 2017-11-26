import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getCookie } from 'tjs'

import styles from './CouponEdt.scss'

import { checkCcyAmt, checkInt } from '../../common/numberValidation'

export default class CouponEdt extends PureComponent {
  state = {
    filePickerKey: Math.random()
  }

  componentWillUnmount() {
    const { reset } = this.props
    reset()
  }

  calStrlen(str) {
    let strlen = 0
    for(let i = 0; i < str.length; i++) {
      if(str.charCodeAt(i) > 255)
        strlen += 2
      else
        strlen++
    }
    return strlen
  }

  changeName = e => {
    const { updateFields } = this.props
    let val = e.target.value
    if (this.calStrlen(val) <= 20) {
      updateFields('name', val)
    }
  }
  changeInt = (key, val) => {
    const { updateFields } = this.props
    if (checkInt(val)) {
      updateFields(key, val === '' ? undefined : +val)
    }
  }
  changeCcyAmt = (key, val) => {
    const { updateFields } = this.props
    if (checkCcyAmt(val)) {
      updateFields(key, val === '' ? undefined : +val )
    }
  }
  changeValue = e => {
    let val = e.target.value
    this.changeCcyAmt('value', val)
  }
  changeTotal = (e) => {
    this.changeInt('total', e.target.value)
  }
  changeLimit = (e) => {
    this.changeInt('limit', e.target.value)
  }
  changeStartTime = (e) => {
    const { updateFields } = this.props
    let val = e.target.value
    updateFields('startTime', val)
  }
  changeEndTime = (e) => {
    const { updateFields } = this.props
    let val = e.target.value
    updateFields('endTime', val)
  }
  changeLimitation = e => {
    const { updateFields } = this.props
    let val = e.target.value
    updateFields('limitation', Boolean(val))
  }
  changeMinConsume = e => {
    let val = e.target.value
    this.changeCcyAmt('minConsume', val)
  }
  changeComment = e => {
    const { updateFields } = this.props
    let val = e.target.value
    if (val.length <= 100) {
      updateFields('comment', val)
    }
  }

  pickFile = e => {
    const { pickFile } = this.props
    let file = e.target.files[0]
    if (file) {
      pickFile(file)
      this.setState({
        filePickerKey: Math.random()
      })
    }
  }

  render() {
    const {
      name, value, total, limit, startTime, endTime, minConsume, limitation, comment, file, disableSubmit, status,
      clearFile, submit
    } = this.props
    const { filePickerKey } = this.state

    return (
      <div className="tile is-ancestor">
        <div className="tile is-vertical is-parent">

          <div className="tile is-child">
            <h1 className="title is-size-5">基本信息</h1>
            <div className="box">
              <div className="field is-horizontal">
                <div className={classnames('field-label', 'is-normal', styles.fieldLabel)}>
                  <label className="label">优惠券名称<span className="has-text-danger">*</span></label>
                </div>
                <div className="field-body is-normal">
                  <div className="field">
                    <p className="control is-expanded">
                      <input className={classnames('input', styles.name)}
                        value={name}
                        placeholder="字数20字符，10个汉字以内"
                        type="text"
                        maxLength="20"
                        onChange={this.changeName}
                      />
                    </p>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className={classnames('field-label', 'is-normal', styles.fieldLabel)}>
                  <label className="label">优惠券面额<span className="has-text-danger">*</span></label>
                </div>
                <div className="field-body is-normal">
                  <div className="field has-addons">
                    <p className="control">
                      <input className={classnames('input', styles.number)}
                        type="number"
                        value={value === undefined ? '' : value}
                        onChange={this.changeValue}
                      />
                    </p>
                    <p className="control">
                      <a className="button is-static">元</a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className={classnames('field-label', 'is-normal', styles.fieldLabel)}>
                  <label className="label">优惠券张数<span className="has-text-danger">*</span></label>
                </div>
                <div className="field-body is-normal">
                  <div className="field has-addons">
                    <p className="control">
                      <input className={classnames('input', styles.number)}
                        type="text"
                        value={total === undefined ? '' : total}
                        onChange={this.changeTotal}
                      />
                    </p>
                    <p className="control">
                      <a className="button is-static">张</a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className={classnames('field-label', 'is-normal', styles.fieldLabel)}>
                  <label className="label">可用时间<span className="has-text-danger">*</span></label>
                </div>
                <div className="field-body is-normal">
                  <div className="field has-addons">
                    <p className="control">
                      <input className={classnames('input', styles.date)}
                        type="datetime-local"
                        value={startTime}
                        onChange={this.changeStartTime}
                      />
                    </p>
                    <p className="control">
                      <a className="button is-static">至</a>
                    </p>
                    <p className="control">
                      <input className={classnames('input', styles.date)}
                        type="datetime-local"
                        value={endTime}
                        onChange={this.changeEndTime}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="tile is-child">
            <h1 className="title is-size-5">规则</h1>
            <div className="box">
              <div className="field is-horizontal">
                <div className={classnames('field-label', 'is-normal', styles.fieldLabel)}>
                  <label className="label">每人限领张数<span className="has-text-danger">*</span></label>
                </div>
                <div className="field-body is-normal">
                  <div className="field has-addons">
                    <p className="control">
                      <input className={classnames('input', styles.number)}
                        type="text"
                        value={limit === undefined ? '' : limit}
                        onChange={this.changeLimit}
                      />
                    </p>
                    <p className="control">
                      <a className="button is-static">张</a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className={classnames('field-label', 'is-normal', styles.fieldLabel)}>
                  <label className="label">使用条件<span className="has-text-danger">*</span></label>
                </div>
                <div className="field-body is-normal">
                  <div className="level">
                    <div className="level-left">
                      <div className="field has-addons is-narrow level-left">
                        <div className="level-item">
                          <div className="control">
                            <input className="radio" type="radio" value="" checked={limitation === false} onChange={this.changeLimitation} />
                          </div>
                        </div>
                        <div className="level-item">不限制</div>
                        <div className="level-item">
                          <p className="control">
                            <input className="radio" type="radio" value="1" checked={limitation === true} onChange={this.changeLimitation} />
                          </p>
                        </div>
                        <div className="level-item">
                          <p className="control">
                            <a className="button is-static">订单满</a>
                          </p>
                          <p className="control">
                            <input className={classnames('input', styles.number)}
                              type="number"
                              disabled={limitation === false}
                              value={minConsume === undefined ? '' : minConsume}
                              onChange={this.changeMinConsume}
                            />
                          </p>
                          <p className="control">
                            <a className="button is-static">元</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className={classnames('field-label', 'is-normal', styles.fieldLabel)}>
                  <label className="label">可用门店<span className="has-text-danger">*</span></label>
                </div>
                <div className="field-body is-normal">
                  <span className="tag is-medium">
                    {`仅${getCookie('store')}`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="tile is-child">
            <h1 className="title is-size-5">编码导入</h1>
            <div className="box">
              <div className="field is-horizontal">
                <div className="field-body is-normal">
                  <div className="field is-narrow">
                    <div className="file has-name">
                      <label className="file-label">
                        <input key={filePickerKey} className="file-input" type="file" disabled={file.converting} onChange={this.pickFile} />
                        <span className="file-cta">
                          <span className="file-icon">
                            <i className="fa fa-upload"></i>
                          </span>
                          <span className="file-label">
                            编码导入
                          </span>
                        </span>
                        {
                          file.name &&
                          <span className="file-name">{file.name}</span>
                        }
                      </label>
                      {
                        file.name &&
                        <span className="control">
                          <a className="tag is-delete" onClick={clearFile}></a>
                        </span>
                      }
                    </div>
                  </div>
                  {
                    file.errUrl &&
                    <div className="field">
                      <span className="control">
                        <a className="button is-danger is-outlined" href={file.errUrl} download>问题表格下载</a>
                      </span>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>

          <div className="tile is-child">
            <h1 className="title is-size-5">备注</h1>
            <div className="field is-horizontal">
              <div className="field-body is-normal">
                <div className="field">
                  <div className="control">
                    <textarea className="textarea"
                      placeholder="可填写100字以内的备注。例如：多张门店优惠券不可叠加使用"
                      maxLength="100"
                      value={comment}
                      onChange={this.changeComment}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="tile is-child">
            <div className="field">
              <div className="control">
                <button className="button is-link is-outlined" disabled={disableSubmit} onClick={submit}>{status ? '保存' : '创建'}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CouponEdt.propTypes = {
  name: PropTypes.string,
  value: PropTypes.number,
  total: PropTypes.number,
  limit: PropTypes.number,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  limitation: PropTypes.bool,
  minConsume: PropTypes.number,
  comment: PropTypes.string,
  file: PropTypes.shape({
    name: PropTypes.string.isRequired,
    converting: PropTypes.bool.isRequired,
    codeBase64: PropTypes.string,
    errUrl: PropTypes.string,
  }),
  disableSubmit: PropTypes.bool.isRequired,
  status: PropTypes.number,

  updateFields: PropTypes.func.isRequired,
  pickFile: PropTypes.func.isRequired,
  clearFile: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
}
