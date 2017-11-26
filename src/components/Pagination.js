import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import classnames from 'classnames'
import omit from 'object.omit'

class Pagination extends PureComponent {
  renderNumberedButton(num) {
    let { currentAt } = this.props
    let active = num === currentAt
    return (
      <a
        key={num}
        className={classnames('pagination-link', {
          'is-current': active
        })}
        data-value={num}
        onClick={this.onPage}
      >
        {num}
      </a>
    )
  }

  onPage = (e) => {
    let { onPage } = this.props
    onPage(parseInt(e.target.getAttribute('data-value')))
  }
  onPagePrevious = () => {
    let { onPage, currentAt } = this.props
    onPage(currentAt - 1)
  }
  onPageNext = () => {
    let { onPage, currentAt } = this.props
    onPage(currentAt + 1)
  }
  changePageSize = (e) => {
    let { onChangePageSize } = this.props
    onChangePageSize(parseInt(e.target.value))
  }

  render() {
    let { totalPages, totalItems, currentAt, pageSizes, pageSize, size } = this.props
    let rest = omit(this.props, Object.keys(Pagination.propTypes))
    let buttonsToShow = []
    let cursor
    for (let i = 1; i <= totalPages; i++) {
      if (i >= currentAt - 2 && i <= currentAt + 2) {
        buttonsToShow.push(i)
      }
    }
    cursor = buttonsToShow[buttonsToShow.length - 1] + 1
    while (buttonsToShow.length < 5 && cursor <= totalPages) {
      buttonsToShow.push(cursor)
      cursor++
    }
    cursor = buttonsToShow[0] - 1
    while (buttonsToShow.length < 5 && cursor >= 1) {
      buttonsToShow.unshift(cursor)
      cursor--
    }
    let currentAtFirstPage = currentAt === 1
    let currentAtLastPage = currentAt === totalPages || totalPages === 0

    return (
      <div className="level">
        <div className="level-left"></div>
        <div className="level-right">
          {
            totalItems >= 0 &&
            <div className="level-item">共{totalItems}条</div>
          }
          <div className="level-item">
            <div className={classnames('pagination', {
              [`is-${size}`]: size
            })} role="navigation" aria-label="pagination" {...rest}>
              <button className="pagination-previous button" disabled={currentAtFirstPage} onClick={this.onPagePrevious}>
                上一页
              </button>
              <button className="pagination-next button" disabled={currentAtLastPage} onClick={this.onPageNext}>
                下一页
              </button>
              <ul className="pagination-list">
                {
                  buttonsToShow.indexOf(1) === -1 &&
                  this.renderNumberedButton(1)
                }
                {
                  buttonsToShow[0] > 2 &&
                  <span>...</span>
                }
                {
                  buttonsToShow.map((page) => this.renderNumberedButton(page))
                }
                {
                  buttonsToShow[buttonsToShow.length - 1] < totalPages - 1 &&
                  <span>...</span>
                }
                {
                  buttonsToShow.indexOf(totalPages) === -1 && totalPages !== 0 &&
                  this.renderNumberedButton(totalPages)
                }
              </ul>
            </div>
          </div>
          {
            pageSizes &&
            <div className="level-item">
              <div className="select">
                <select value={pageSize} onChange={this.changePageSize}>
                  {
                    pageSizes.map((ps, idx) =>  <option key={idx} value={ps}>{`${ps}条`}</option>)
                  }
                </select>
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentAt: PropTypes.number.isRequired,
  totalItems: PropTypes.number,
  pageSizes: PropTypes.array,
  pageSize: PropTypes.number,
  size: PropTypes.string,

  onPage: PropTypes.func.isRequired,
  onChangePageSize: PropTypes.func
}

export default Pagination
