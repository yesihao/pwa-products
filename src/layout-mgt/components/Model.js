import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './Model.scss'

export default class Model extends PureComponent {
  closeMenu = (e) => {
    const { onModelClick } = this.props
    if (!this.model.contains(e.target)) {
      e.stopPropagation()
      onModelClick(null)
      document.removeEventListener('click', this.closeMenu, false)
    }
  }
  onModelClick = (e) => {
    const { id, onModelClick } = this.props
    e.stopPropagation()
    onModelClick(id)
    this.onEdit()
    document.addEventListener('click', this.closeMenu, false)
  }

  onView = () => {
    const { id, onEdit } = this.props
    onEdit(id, true)
  }
  onEdit = () => {
    const { id, onEdit } = this.props
    onEdit(id)
  }
  onDelete = () => {
    const { id, onDelete } = this.props
    onDelete(id)
  }

  render() {
    const {
      name, pos, zoom, width, height, initUnitLen,
      showMenu, status, category
    } = this.props

    return (
      <div className={styles.centered}
        style={{
          width: width * initUnitLen,
          height: height * initUnitLen,
          transform: `translate(${pos[0] * initUnitLen * zoom}px, ${pos[1] * initUnitLen * zoom}px)`,
        }}
        ref={model => this.model = model}
      >
        { showMenu &&
          <div className={classnames('level', styles.menu)}
            style={{ bottom: (initUnitLen - initUnitLen * zoom) / 2 - 30 }}
          >
            {
              status === 2 && category !== 'decoration' &&
              <a className="icon level-item" onClick={this.onView}>
                <i className="fa fa-lg fa-eye" aria-hidden="true"></i>
              </a>
            }
            {
              category !== 'decoration' &&
              <a className="icon level-item" onClick={this.onEdit}>
                <i className="fa fa-lg fa-pencil-square" aria-hidden="true"></i>
              </a>
            }
            <a className="icon level-item" onClick={this.onDelete}>
              <i className="fa fa-lg fa-trash" aria-hidden="true"></i>
            </a>
          </div>
        }
        <div className={classnames(styles.centered, styles.sign)}
          style={{ transform: `scale(${zoom})` }}
          onClick={this.onModelClick}
        />
        <label className={styles.name} style={{ bottom: (initUnitLen - initUnitLen * zoom) / 2 - 18 }} >
          {name}
        </label>
      </div>
    )
  }
}

Model.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  pos: PropTypes.array.isRequired,
  zoom: PropTypes.number.isRequired,
  initUnitLen: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  showMenu: PropTypes.bool.isRequired,
  status: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,

  onModelClick: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

Model.defaultProps = {
  width: 1,
  height: 1,
}
