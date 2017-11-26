import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import picExample from '../../assets/images/shw-ex-pic.jpg'
import vdoExample from '../../assets/images/shw-ex-vdo.jpg'
import styles from './SlctRowItemDlg.scss'

import ImgUpld from '../../components/ImgUpld.js'
import VdoUpld from '../../components/VdoUpld.js'
import Void from '../../components/Void.js'

export default class SlctRowItemDlg extends PureComponent {
  state = {
    picPickerKey: Math.random(),
    thmPickerKey: Math.random(),
  }

  showPicPicker = () => {
    this.picPicker.click()
  }
  showThmPicker = () => {
    this.thmPicker.click()
  }

  pickPic = e => {
    const { pickPic } = this.props

    if (e.target.files[0]) {
      pickPic(e.target.files[0])
      this.setState({
        picPickerKey: Math.random()
      })
    }
  }
  pickThm = e => {
    const { pickThm } = this.props

    if (e.target.files[0]) {
      pickThm(e.target.files[0])
      this.setState({
        thmPickerKey: Math.random()
      })
    }
  }

  render() {
    const {
      title, description, thumb, pictures, canAddPicture, invalid, style, video,
      chgTitle, chgDesc, delPic, delThm, confirm, cancel, chgStyle, chgVdo, videoError,
    } = this.props

    return (
      <div className={classnames('modal-content', styles.clearDec)}>
        <div className="columns is-marginless is-centered">
          <div className="column is-paddingless">
            <div className="message is-dark">
              <div className="message-header">
                编辑商品
                <a className="delete" onClick={() => cancel()} />
              </div>
              <div className="message-body">
                <div className="columns">
                  <div className="column is-6">
                    <label className="label">示例</label>
                    <figure className="image-is-1by1">
                      { style === 'descPictures' && <img src={vdoExample} /> }
                      { style === 'video' && <img src={picExample} /> }
                    </figure>
                  </div>
                  <div className="column is-6">
                    <div className="field">
                      <label className="label">商品<span className="has-text-danger">*</span></label>
                      <div className="columns">
                        <div className="column is-4">
                          <ImgUpld url={thumb && thumb.url} loading={thumb && thumb.loading}
                            onClickAdd={this.showThmPicker}
                            onClickDel={delThm}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">标题</label>
                      <div className="control">
                        <input className="input" type="text"
                          placeholder="如羽绒背心，￥198（最多10个字）"
                          maxLength={10}
                          value={title}
                          onChange={e => chgTitle(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">类型<span className="has-text-danger">*</span></label>
                      <div className="field has-addons">
                        <div className="control">
                          <button className={classnames('button', { 'is-link': style === 'descPictures' })}
                            onClick={() => chgStyle('descPictures')}
                          >
                            图片
                          </button>
                        </div>
                        <div className="control">
                          <button className={classnames('button', { 'is-link': style === 'video' })}
                            onClick={() => chgStyle('video')}
                          >
                            视频
                          </button>
                        </div>
                      </div>
                    </div>
                    { style === 'descPictures' &&
                      <Void>
                        <div className="field">
                          <label className="label">说明</label>
                          <div className="control">
                            <input className="input" type="text"
                              placeholder="如搭配，试穿效果（最多8个字）"
                              maxLength={8}
                              value={description}
                              onChange={e => chgDesc(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="field">
                          <label className="label">图片<span className="has-text-danger">*</span></label>
                          <div className="columns is-multiline">
                            { pictures.map((pic, idx) => (
                              <div key={idx} className="column is-4">
                                <ImgUpld url={pic.url} loading={pic.loading}
                                  onClickDel={() => delPic(pic.id)}
                                />
                              </div>
                            )) }
                            { canAddPicture &&
                              <div className="column is-4">
                                <ImgUpld onClickAdd={this.showPicPicker} />
                              </div>
                            }
                          </div>
                        </div>
                      </Void>
                    }
                    { style === 'video' &&
                      <VdoUpld video={video} onError={videoError} onChange={chgVdo} />
                    }
                  </div>
                </div>

                <div className="field is-grouped is-grouped-right">
                  <div className="control">
                    <button className="button is-link is-outlined"
                      onClick={() => confirm()}
                      disabled={invalid}
                    >
                      确定
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <input type="file" className="is-none"
          key={this.state.picPickerKey}
          ref={x => this.picPicker = x}
          onChange={this.pickPic}
        />

        <input type="file" className="is-none"
          key={this.state.thmPickerKey}
          ref={x => this.thmPicker = x}
          onChange={this.pickThm}
        />
      </div>
    )
  }
}

SlctRowItemDlg.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  thumb: PropTypes.shape({
    url: PropTypes.string,
    loading: PropTypes.bool,
  }),
  video: PropTypes.shape({
    videoUrl: PropTypes.string,
    coverUrl: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
  style: PropTypes.string.isRequired,
  pictures: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    loading: PropTypes.bool,
  })).isRequired,
  canAddPicture: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,

  chgTitle: PropTypes.func.isRequired,
  chgStyle: PropTypes.func.isRequired,
  chgDesc: PropTypes.func.isRequired,
  pickPic: PropTypes.func.isRequired,
  pickThm: PropTypes.func.isRequired,
  delPic: PropTypes.func.isRequired,
  delThm: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  videoError: PropTypes.func.isRequired,
  chgVdo: PropTypes.func.isRequired,
}
