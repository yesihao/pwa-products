import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './AdtEdt.scss'

import BscEdt from '../containers/BscEdt.js'
import Void from '../../components/Void.js'
import ImgUpld from '../../components/ImgUpld.js'
import VdoUpld from '../../components/VdoUpld.js'
import Help from '../../components/Help.js'

import pic from '../../assets/images/style-ex-pic.jpg'
import vdo from '../../assets/images/style-ex-vdo.jpg'
import txt from '../../assets/images/style-ex-txt.jpg'

const picMap = {
  descPictures: pic,
  video: vdo,
  cornerText: txt
}
const btns = [
  { key: 'descPictures', val: '图片' },
  { key: 'video', val: '视频' },
  { key: 'cornerText', val: '文案+角标' },
]
class AdtEdtStyleTip extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      selected: props.selected
    }
  }

  componentWillReceiveProps(props) {
    if (props.selected !== this.props.selected) {
      this.setState({ selected: props.selected })
    }
  }

  render() {
    const { selected } = this.state

    return (
      <div className={styles.tooltip}>
        <figure className="image">
          <img src={picMap[selected]} />
        </figure>
        <div className={classnames('buttons has-addons is-centered', styles.btnGroup)}>
          { btns.map((btn, idx) => (
            <span key={idx}
              className={classnames('button is-small', {
                'is-link': btn.key === selected,
                'is-selected': btn.key === selected,
              })}
              onClick={() => this.setState({ selected: btn.key })}
            >
              {btn.val}
            </span>
          )) }
        </div>
      </div>
    )
  }
}
AdtEdtStyleTip.propTypes = {
  selected: PropTypes.string,
}
AdtEdtStyleTip.defaultProps = {
  selected: 'descPictures'
}

export default class AdditionalTileEditing extends PureComponent {
  state = {
    picPickerKey: Math.random(),
    cornerPickerKey: Math.random(),
  }

  showPicPicker = () => {
    this.picPicker.click()
  }
  showCornerPicker = () => {
    this.cornerPicker.click()
  }

  pickImage = e => {
    const { pickImage } = this.props

    if (e.target.files[0]) {
      pickImage(e.target.files[0])
      this.setState({
        picPickerKey: Math.random()
      })
    }
  }
  pickCorner = e => {
    const { pickCorner } = this.props

    if (e.target.files[0]) {
      pickCorner(e.target.files[0])
      this.setState({
        cornerPickerKey: Math.random()
      })
    }
  }

  render() {
    const {
      style, title, description, text, pictures, canAddPicture, corner, invalid, video,
      changeStyle, changeTitle, changeDescription, changeText, deleteImage, deleteCorner, notify, chgVdo,
    } = this.props

    return (
      <BscEdt editingType="adtEdt" invalid={invalid}>
        <div className="field">
          <label className="label">标题</label>
          <div className="control">
            <input className="input" type="text"
              placeholder="如羽绒背心，￥198（最多10个字）"
              maxLength={10}
              value={title}
              onChange={e => changeTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">
            样式
            <span className="has-text-danger">*</span>
            <Help><AdtEdtStyleTip selected={style} /></Help>
          </label>
          <div className="field has-addons">
            <div className="control">
              <button
                className={classnames('button', {
                  'is-link': style === 'descPictures'
                })}
                onClick={() => changeStyle('descPictures')}
              >图片</button>
            </div>
            <div className="control">
              <button
                className={classnames('button', {
                  'is-link': style === 'video'
                })}
                onClick={() => changeStyle('video')}
              >视频</button>
            </div>
            <div className="control">
              <button
                className={classnames('button', {
                  'is-link': style === 'cornerText'
                })}
                onClick={() => changeStyle('cornerText')}
              >文案+角标</button>
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
                  onChange={e => changeDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">图片<span className="has-text-danger">*</span></label>
              <div className="columns is-multiline">
                { pictures.map((pic, idx) => (
                  <div key={idx} className="column is-4">
                    <ImgUpld url={pic.url} loading={pic.loading} onClickDel={() => deleteImage(pic.id)} />
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

        { style === 'cornerText' &&
          <Void>
            <div className="field">
              <label className="label">文案<span className="has-text-danger">*</span></label>
              <div className="control">
                <textarea className="textarea"
                  value={text}
                  onChange={e => changeText(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">角标</label>
              <div className="columns">
                <div className="column is-4">
                  <ImgUpld url={corner && corner.url} loading={corner && corner.loading}
                    onClickAdd={this.showCornerPicker}
                    onClickDel={deleteCorner}
                  />
                </div>
              </div>
            </div>
          </Void>
        }

        { style === 'video' &&
          <VdoUpld video={video} onError={m => notify(m, 'danger')} onChange={chgVdo} />
        }

        <input type="file" className="is-none"
          key={this.state.picPickerKey}
          ref={x => this.picPicker = x}
          onChange={this.pickImage}
        />

        <input type="file" className="is-none"
          key={this.state.cornerPickerKey}
          ref={x => this.cornerPicker = x}
          onChange={this.pickCorner}
        />
      </BscEdt>
    )
  }
}

AdditionalTileEditing.propTypes = {
  style: PropTypes.oneOf(['cornerText', 'descPictures', 'video']),
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  corner: PropTypes.shape({
    url: PropTypes.string,
    loading: PropTypes.bool,
  }),
  pictures: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    loading: PropTypes.bool,
  })).isRequired,
  video: PropTypes.shape({
    videoUrl: PropTypes.string,
    coverUrl: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
  canAddPicture: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,

  pickImage: PropTypes.func.isRequired,
  pickCorner: PropTypes.func.isRequired,
  changeStyle: PropTypes.func.isRequired,
  changeTitle: PropTypes.func.isRequired,
  changeDescription: PropTypes.func.isRequired,
  changeText: PropTypes.func.isRequired,
  deleteImage: PropTypes.func.isRequired,
  deleteCorner: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired,
  chgVdo: PropTypes.func.isRequired,
}
