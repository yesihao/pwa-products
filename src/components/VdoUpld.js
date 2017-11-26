import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import ImgUpld from './ImgUpld.js'
import upldRes from '../apis/upldRes.js'
import readVideoMeta from '../common/readVideoMeta.js'
import readImageMeta from '../common/readImageMeta.js'

import videoImg from '../assets/images/video.png'

export default class VdoUpld extends PureComponent {
  state = {
    videoLoading: false,
    coverLoading: false,
    videoFileKey: Math.random(),
    coverFileKey: Math.random(),
  }

  uploadVideo = async e => {
    const { onChange, onError } = this.props
    const file = e.target.files[0]

    this.setState({
      videoFileKey: Math.random(),
      videoLoading: true
    })

    if (file.type !== 'video/mp4' && file.type !== 'video/mpeg') {
      onError('请上传MP4格式的视频文件')
    } else {
      try {
        const meta = await readVideoMeta(file)
        const resp = await upldRes(file)

        onChange({
          ...this.props.video,
          ...meta,
          videoUrl: resp.url,
        })
      } catch (e) {
        onError('上传失败')
      }
    }

    this.setState({ videoLoading: false })
  }

  uploadCover = async e => {
    const { onChange, onError, video } = this.props
    const file = e.target.files[0]

    this.setState({
      coverFileKey: Math.random(),
      coverLoading: true
    })

    if (file.type.indexOf('image') !== 0) {
      onError('请上传图片文件')
    } else {
      try {
        const meta = await readImageMeta(file)
        if (Math.abs(meta.width / meta.height - video.width / video.height) > 0.01) {
          onError('封面图片须与视频宽高比相同')
        } else {
          const resp = await upldRes(file)

          onChange({
            ...video,
            coverUrl: resp.url
          })
        }
      } catch (e) {
        onError('上传失败')
      }
    }

    this.setState({ coverLoading: false })
  }

  delVideo = () => {
    const { onChange } = this.props

    onChange({})
  }
  delCover = () => {
    const { onChange, video } = this.props

    onChange({ ...video, coverUrl: undefined })
  }

  render() {
    const { video } = this.props
    const { videoLoading, coverLoading, videoFileKey, coverFileKey } = this.state

    return (
      <div className="columns">
        <div className="column is-one-half">
          <div className="field">
            <label className="label">视频<span className="has-text-danger">*</span></label>
            <div className="columns">
              <div className="column is-8">
                <ImgUpld url={video.videoUrl && videoImg} loading={videoLoading}
                  onClickAdd={() => this.video.click()}
                  onClickDel={this.delVideo}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="column is-one-half">
          { video.videoUrl &&
              <div className="field">
                <label className="label">封面<span className="has-text-danger">*</span></label>
                <div className="columns">
                  <div className="column is-8">
                    <ImgUpld url={video.coverUrl} loading={coverLoading}
                      onClickAdd={() => this.cover.click()}
                      onClickDel={this.delCover}
                    />
                  </div>
                </div>
              </div>
          }
        </div>

        <input type="file" className="is-none" key={videoFileKey}
          ref={ref => this.video = ref}
          onChange={this.uploadVideo}
        />
        <input type="file" className="is-none" key={coverFileKey}
          ref={ref => this.cover = ref}
          onChange={this.uploadCover}
        />
      </div>
    )
  }
}

VdoUpld.propTypes = {
  video: PropTypes.shape({
    videoUrl: PropTypes.string,
    coverUrl: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
}
