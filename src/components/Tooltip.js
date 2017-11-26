import React, { PureComponent, createElement  } from 'react'
import ReactDOM from 'react-dom'
import hoistStatics from 'hoist-non-react-statics'
import PropTypes from 'prop-types'
import I from 'immutable'

import styles from './Tooltip.scss'

class Card extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    targetEl: PropTypes.object,
    showDelay: PropTypes.number,
    hideDelay: PropTypes.number,
    gap: PropTypes.number,
    children: PropTypes.node,
  }
  static defaultProps = {
    showDelay: 500,
    hideDelay: 500,
    gap: 15,
  }

  constructor(props) {
    super(props)
    this.timer = null
  }
  state = {
    pos: 'top',
    top: 0,
    left: 0,
    arrowTop: 0,
    arrowLeft: 0,
    opacity: 0,
    visibility: 'hidden',
  }

  getStyle() {
    let { opacity, visibility, top, left } = this.state
    let style = {
      position: 'absolute',
      padding: '5px',
      background: '#fff',
      boxShadow: '0 0 8px rgba(0, 0, 0, .3)',
      borderRadius: '3px',
      transition: 'opacity .3s ease-in-out, visibility .3s ease-in-out',
      zIndex: 99,
      opacity: opacity,
      visibility: visibility,
      top: top,
      left: left,
    }
    return I.Map(this.props.style).merge(style).toObject()
  }
  getArrowStyle() {
    let { pos, arrowTop, arrowLeft } = this.state
    let style = {
      top: arrowTop,
      left: arrowLeft,
      transform: `rotate(${pos === 'top' ? 0 : 180 }deg)`,
    }
    return style
  }

  calcSizeAndPos() {
    let { gap } = this.props
    let targetPosition = this.props.targetEl.getBoundingClientRect()
    let targetWidth = targetPosition.width
    let targetheight = targetPosition.height
    let winWidth = window.innerWidth
    let winHeight = window.innerHeight
    let scrollY = (window.scrollY !== undefined) ? window.scrollY : window.pageYOffset
    let scrollX = (window.scrollX !== undefined) ? window.scrollX : window.pageXOffset
    let tooltipWidth = this.tooltipEl.offsetWidth
    let tooltipHeight = this.tooltipEl.offsetHeight

    let top, left, pos, arrowTop, arrowLeft
    if (targetPosition.top < tooltipHeight + gap && winHeight - targetPosition.bottom > tooltipHeight + gap) {
      top = scrollY + targetPosition.top + targetheight + gap
      pos = 'bottom'
      arrowTop = -16
    } else {
      top = scrollY + targetPosition.top - tooltipHeight - gap
      pos = 'top'
      arrowTop = tooltipHeight
    }
    left = scrollX + targetPosition.left + targetWidth / 2 - tooltipWidth / 2
    arrowLeft = tooltipWidth / 2 - 9
    let offsetLeft = tooltipWidth / 2 - (targetPosition.left + targetWidth / 2) + 10
    let offsetRight = tooltipWidth / 2 - (winWidth - 25 - targetPosition.right + targetWidth / 2)
    if (offsetLeft > 0) {
      left = left + offsetLeft
      arrowLeft = arrowLeft - offsetLeft
    } else if (offsetRight > 0) {
      left = left - offsetRight
      arrowLeft = arrowLeft + offsetRight
    }

    this.setState({ top, left, pos, arrowTop, arrowLeft })
  }
  updateTooltip = () => {
    let tooltipWidth = this.tooltipEl.offsetWidth
    let tooltipHeight = this.tooltipEl.offsetHeight
    if (tooltipWidth !== this.state.tooltipWidth || tooltipHeight !== this.state.tooltipHeight) {
      this.calcSizeAndPos()
    }
    this.setupSizeCheck()
  }
  setupSizeCheck() {
    this.check = requestAnimationFrame(this.updateTooltip)
  }

  show = () => {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.setState({
        opacity: 1,
        visibility: 'visible',
      })
    }, this.props.showDelay)
  }

  show1 = () => {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.setState({
        opacity: 1,
        visibility: 'visible',
      })
    }, this.props.showDelay)
  }
  hide = () => {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.setState({
        opacity: 0,
        visibility: 'hidden',
      })
    }, this.props.hideDelay)
  }

  handleMouseEnter = () => {
    this.show()
  }
  handleMouseLeave = () => {
    this.hide()
  }

  componentDidMount() {
    this.tooltipEl.addEventListener('mouseenter', this.show)
    this.tooltipEl.addEventListener('mouseleave', this.hide)
    this.props.targetEl.addEventListener('mouseenter', this.show)
    this.props.targetEl.addEventListener('mouseleave', this.hide)
    this.calcSizeAndPos()
    this.setupSizeCheck()
  }
  componentWillUnMount() {
    cancelAnimationFrame(this.check)
  }

  render() {
    const { children, className } = this.props

    return (
      <div style={this.getStyle()} className={className} ref={c => this.tooltipEl = c} >
        <div style={this.getArrowStyle()} className={styles.arrow}>
          <span className={styles.left}></span>
          <span className={styles.right}></span>
        </div>
        {children}
      </div>)
  }
}


function Tooltip(WrappedComponent) {
  const connectDisplayName = `Tooltip(${WrappedComponent.displayName})`
  class Tooltip extends PureComponent {
    static propTypes = {
      children: PropTypes.node,
    }
    static displayName = connectDisplayName
    static WrappedComponent = WrappedComponent
    static root = document.getElementById('root')

    state = {
      targetEl: null,
    }

    render() {
      const { children, ...rest } = this.props
      const { targetEl } = this.state

      return ([
        targetEl && ReactDOM.createPortal(
          <Card key={1}
            targetEl={targetEl}
            {...rest}
          >{children}</Card>,
          root
        ),
        createElement(WrappedComponent, {
          key: 2,
          targetRef: c => this.setState({ targetEl: c }),
        })
      ])
    }
  }

  return hoistStatics(Tooltip, WrappedComponent)
}

export default Tooltip
