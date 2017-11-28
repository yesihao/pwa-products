import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

class Pagination extends PureComponent {
  onPagePrevious = () => {
    let { onPage, currentAt } = this.props
    onPage(currentAt - 1)
  }
  onPageNext = () => {
    let { onPage, currentAt } = this.props
    onPage(currentAt + 1)
  }

  render() {
    let { totalPages, currentAt } = this.props

    let currentAtFirstPage = currentAt === 1
    let currentAtLastPage = currentAt === totalPages || totalPages === 0

    return (
      <div className="level-item">
        <div className="level-item">
          <div className="pagination is-centered is-small" role="navigation" aria-label="pagination">
            <button className="pagination-previous button"
              disabled={currentAtFirstPage}
              onClick={this.onPagePrevious}
            >上一页</button>
            <div style={{ padding: '1rem' }}>
              <span className="has-text-primary">{currentAt}</span>
              /{totalPages}
            </div>
            <button className="pagination-next button"
              disabled={currentAtLastPage}
              onClick={this.onPageNext}
            >下一页</button>
          </div>
        </div>
      </div>
    )
  }
}

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentAt: PropTypes.number.isRequired,

  onPage: PropTypes.func.isRequired,
}

export default Pagination
