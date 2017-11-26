import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import BscEdt from '../containers/BscEdt.js'

import ImgUpld from '../../components/ImgUpld.js'
import ImgUpld2 from '../../components/ImgUpld2.js'
import VdoUpld from '../../components/VdoUpld.js'

export default class LndScrEdt extends PureComponent {
  state = { fileKey: Math.random() }

  uploadFiles = e => {
    const { uploadFiles } = this.props

    uploadFiles(e.target.files)
    this.setState({ fileKey: Math.random() })
  }

  render() {
    const {
      invalid, style, video, pictures, showAddPic,
      changeVideo, changeStyle, notify, changeImage, delImage,
    } = this.props
    const { fileKey } = this.state

    return (
      <BscEdt editingType="lndScrEdt" invalid={invalid}>
        <div className="field">
          <label className="label">样式<span className="has-text-danger">*</span></label>
          <div className="field has-addons">
            <div className="control">
              <button
                className={classnames('button', {
                  'is-link': style === 'picture'
                })}
                onClick={() => changeStyle('picture')}
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
          </div>
        </div>

        { style === 'picture' &&
          <div className="field">
            <label className="label">图片<span className="has-text-danger">*</span></label>
            <div className="columns is-multiline">
              { pictures.map((pic, idx) => (
                <div key={idx} className="column is-4">
                  <ImgUpld2 url={pic.url} file={pic.file}
                    onClickDel={() => delImage(pic.id)}
                    onChange={changeImage.bind(null, pic.id)}
                    onError={m => notify(m, 'danger')}
                  />
                </div>
              )) }
              { showAddPic &&
                <div className="column is-4">
                  <ImgUpld onClickAdd={() => this.file.click()} />
                </div>
              }
            </div>
          </div>
        }

        { style === 'video' &&
          <div className="field">
            <VdoUpld video={video} onError={m => notify(m, 'danger')} onChange={changeVideo} />
          </div>
        }

        <input key={fileKey} type="file" className="is-none" multiple
          ref={ref => this.file = ref}
          onChange={this.uploadFiles}
        />
      </BscEdt>
    )
  }
}

LndScrEdt.propTypes = {
  style: PropTypes.oneOf(['picture', 'video']),
  pictures: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    file: PropTypes.object,
  })).isRequired,
  showAddPic: PropTypes.bool.isRequired,
  video: PropTypes.shape({
    videoUrl: PropTypes.string,
    coverUrl: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
  invalid: PropTypes.bool.isRequired,

  changeStyle: PropTypes.func.isRequired,
  changeVideo: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired,
  uploadFiles: PropTypes.func.isRequired,
  delImage: PropTypes.func.isRequired,
  changeImage: PropTypes.func.isRequired,
}
