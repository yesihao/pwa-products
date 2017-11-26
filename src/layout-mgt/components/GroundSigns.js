import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class GroundSigns extends PureComponent {
  state = {
    filePickerKey: Math.random()
  }

  pickImg = e => {
    const { pictures, pickImg } = this.props
    let file = e.target.files[0]
    if (file) {
      pickImg(pictures[0].id, file)
      this.setState({
        filePickerKey: Math.random()
      })
    }
  }

  render() {
    const {
      pictures, uploading,
    } = this.props
    const { filePickerKey } = this.state

    return (
      <div className="column">
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              当前使用的地贴：
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <div className="file is-primary">
                <label className="file-label">
                  <input key={filePickerKey}
                    className="file-input"
                    type="file"
                    disabled={uploading}
                    onChange={this.pickImg}
                  />
                  <span className="file-cta">
                    <span className="file-label">
                      更改地贴图片
                    </span>
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="columns is-multiline">
          {
            pictures.map((pic, idx) =>
              <div key={idx} className="column is-4">
                <div className="box is-paddingless is-clipped">
                  <figure className="image is-1by1">
                    <img src={pic.url} />
                  </figure>
                </div>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

GroundSigns.propTypes = {
  uploading: PropTypes.bool.isRequired,
  pictures: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    loading: PropTypes.bool,
  })).isRequired,

  pickImg: PropTypes.func.isRequired,
}
