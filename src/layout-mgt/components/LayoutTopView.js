import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './LayoutTopView.scss'
import Model from './Model'

export default class LayoutTopView extends PureComponent {
  constructor() {
    super()
    this.state = {
      cursor: 'default',
      mouseEntered: false,
      dragStarted: false,
      startX: 0,
      startY: 0,
      moveX: 0,
      moveY: 0,
      initUnitLen: null,
    }
  }
  componentWillMount = () => {
    const { measureScaleBase, measureScales, measureScaleIndex } = this.props
    this.setState({ initUnitLen: measureScaleBase / measureScales[measureScaleIndex] })
  }
  componentDidMount = () => {
    this.updateCanvasSize()
    window.addEventListener('resize', this.updateCanvasSize, false)
  }
  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateCanvasSize)
  }

  updateCanvasSize = () => {
    const { updateCanvasSize } = this.props
    updateCanvasSize('height', window.innerHeight - this.canvasFrame.getBoundingClientRect().top - 20)
  }

  increaseMeasureScale = () => {
    const { changeScale, measureScales, measureScaleIndex } = this.props
    if (measureScaleIndex + 1 < measureScales.length) {
      changeScale(measureScaleIndex + 1)
    }
  }
  decreaseMeasureScale = () => {
    const { changeScale, measureScaleIndex } = this.props
    if (measureScaleIndex - 1 >= 0) {
      changeScale(measureScaleIndex - 1)
    }
  }

  handleMouseEnter = () => {
    this.setState({ mouseEntered: true })
  }
  handleMouseLeave = () => {
    this.setState({
      mouseEntered: false,
      dragStarted: false,
      cursor: 'default',
    })
  }
  handleMouseDown = (e) => {
    const { mouseEntered, moveX, moveY  } = this.state
    if (mouseEntered && e.target.contains(this.canvas)) {
      this.setState({
        startX: e.clientX - moveX,
        startY: e.clientY - moveY,
        dragStarted: true,
        cursor: '-webkit-grabbing'
      })
    }
  }
  handleMouseUp = () => {
    this.setState({
      dragStarted: false,
      cursor: 'default',
    })
  }
  handleMouseMove = (e) => {
    const { dragStarted, startX, startY } = this.state
    if (dragStarted) {
      this.setState({
        moveX: e.clientX - startX,
        moveY: e.clientY - startY,
      })
    }
  }
  handleWheel = (e) => {
    e.preventDefault()
    if (e.deltaY > 0) {
      this.increaseMeasureScale()
    } else {
      this.decreaseMeasureScale()
    }
  }

  render() {
    const { models, canvasHeight, clickedModel, clickModel, measureScale, measureScaleBase, editModel, deleteModel } = this.props
    const { moveX, moveY, cursor, initUnitLen } = this.state
    let zoom = measureScaleBase / initUnitLen / measureScale

    return (
      <div className={classnames('box', styles.container)}
        style={{ height: canvasHeight, cursor: cursor }}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
        onWheel={this.handleWheel}
        ref={frame => this.canvasFrame = frame}
      >
        <div className="level">
          <div className="level-left">
            <span className="icon level-item">
              <i className="fa fa-lg fa-map-signs" aria-hidden="true"></i>
            </span>
            <label className="level-item">当前视图: 俯视图</label>
          </div>
        </div>
        <div className={styles.centered}
          style={{ transform: `translate(${moveX}px, ${moveY}px` }}
          ref={canvas => this.canvas = canvas}
        >
          <div className={styles.centered} style={{ width: initUnitLen * 1, height: initUnitLen * 1 }}>
            <div className={styles.sign} style={{ transform: `scale(${zoom})` }}></div>
            <p className={styles.name} style={{ bottom: (initUnitLen - initUnitLen * zoom) / 2 - 18 }}>
              入口
            </p>
          </div>
          {
            models.map(model => <Model
              key={model.id}
              id={model.id}
              name={model.name}
              showMenu={clickedModel === model.id}
              pos={[model.x, model.z]}
              zoom={zoom}
              initUnitLen={initUnitLen}
              status={model.status}
              category={model.function}
              onModelClick={clickModel}
              onEdit={editModel}
              onDelete={deleteModel} />
            )
          }
        </div>
        <div className={classnames('level', styles.scaler)}>
          <div className="level-left">
            <label className="level-item">比例尺{measureScale}米</label>
            <a className="icon level-item" onClick={this.decreaseMeasureScale}>
              <i className="fa fa-lg fa-minus" aria-hidden="true"></i>
            </a>
            <a className="icon level-item" onClick={this.increaseMeasureScale}>
              <i className="fa fa-lg fa-plus" aria-hidden="true"></i>
            </a>
            <div className="level-item">
              <progress className="progress" style={{width: `${measureScaleBase}px`}} value="100" max="100">15%</progress>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

LayoutTopView.propTypes = {
  models: PropTypes.array.isRequired,
  canvasHeight: PropTypes.number.isRequired,
  canvasWidth: PropTypes.number.isRequired,
  measureScale: PropTypes.number.isRequired,
  measureScales: PropTypes.array.isRequired,
  measureScaleIndex: PropTypes.number.isRequired,
  measureScaleBase: PropTypes.number.isRequired,
  clickedModel: PropTypes.string,

  clickModel: PropTypes.func.isRequired,
  changeScale: PropTypes.func.isRequired,
  updateCanvasSize: PropTypes.func.isRequired,
  editModel: PropTypes.func.isRequired,
  deleteModel: PropTypes.func.isRequired,
}
